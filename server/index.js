// Load required modules.
const winston = require('winston');
const express = require('express');
const bodyParser = require('body-parser');
const expressWinston = require('express-winston');
const sqlite3 = require('sqlite3');
const path = require('path');
const cors = require('cors'); // https://github.com/rangle/hub/wiki/CORS

const HOME_PAGE = `
<html>
  <body>
    <ul>
      <li><a href="/courses">/courses</a></li>
      <li><a href="/offerings/1">/offerings/1</a></li>
      <li><a href="/classes/1">/classes/1</a></li>
    </ul>
  </body>
</html>
`;

const Q_CREATE_COURSE = `
insert into Course(course_name) values(?);
`;

const Q_GET_ALL_COURSES = `
select
    Course.ident                as course_id,
    Course.course_name          as course_name
from
    Course;
`;

const Q_UPDATE_COURSE = `
update
    Course
set
    course_name = ?
where
    ident = ?;
`;

const Q_DELETE_COURSE = `
delete from
    Course
where
    ident = ?;
`;

const Q_CREATE_OFFERING = `
insert into Offering(course_id) values(?);
`;

const Q_GET_ALL_OFFERINGS_OF_COURSE = `
select
    Course.ident                as course_id,
    Course.course_name          as course_name,
    Offering.ident              as offering_id,
    min(Class.class_date)       as start_date
from
    Course join Offering join Class
on
    Offering.course_id = Course.ident
and
    Class.offering_id = Offering.ident
where
    Course.ident = ?
group by
    Offering.ident;
`;

const Q_GET_COURSE_OF_OFFERING = `
select
    Course.ident		as course_id,
    Course.course_name          as course_name,
    min(Class.class_date)       as start_date
from
    Course join Offering join Class
on
    Offering.course_id = Course.ident
and
    Class.offering_id = Offering.ident
where
    Offering.ident = ?
group by
    Offering.ident;
`;

const Q_DELETE_OFFERING = `
delete from
    Offering
where
    ident = ?;
`;

const Q_CREATE_CLASS = `
insert into Class(offering_id, class_date, class_time) values(?, ?, ?);
`;

const Q_GET_ALL_CLASSES_OF_OFFERING = `
select
    Course.ident                as course_id,
    Course.course_name          as course_name,
    Offering.ident              as offering_id,
    Class.ident                 as class_id,
    Class.class_date            as class_date,
    Class.class_time            as class_time
from
    Course join Offering join Class
on
    Course.ident   = Offering.course_id and
    Offering.ident = Class.offering_id
where
    Offering.ident = ?
`;

const Q_GET_ONE_CLASS_OF_OFFERING = `
select
    Course.ident                as course_id,
    Course.course_name          as course_name
from
    Course join Offering join Class
on
    Offering.course_id = Course.ident
and
    Class.offering_id = Offering.ident
where
    Class.ident = ?;
    `;

const Q_GET_OFFERING_OF_CLASS = `
select
    Offering.ident		as offering_id
from
    Offering join Class
on
    Class.offering_id = Offering.ident
where
    Class.ident = ?;
`;

const Q_DELETE_CLASS = `
delete from
    Class
where
    ident = ?;
`;

// Main objects.
const port = 3654;
const app = express();

// Tell server to accept cross-origin requests.
app.use(cors());

// And tell the app to convert POST bodies to JSON.
app.use(bodyParser.json());

// Set up logging.
app.use(expressWinston.logger({
    transports: [
        new winston.transports.Console({
            json: false,
            colorize: true
        })
    ],
    meta: false,
    msg: "HTTP {{res.statusCode}} {{req.method}} {{req.url}}"
}));

// Connect to database.
const db_path = path.join(__dirname, 'academy.db');
const db = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.log(`DATABASE ERROR ${err}`);
});

// Links to all endpoints for testing purposes.
// "/" =>
// HTML
app.get('/', (req, res, next) => {
    res.status(200).send(HOME_PAGE);
});

// List all courses
// "/courses" =>
// [{course_id, course_name}*]
app.get('/courses', (req, res, next) => {
    db.all(Q_GET_ALL_COURSES, (err, rows) => {
        if (err) return next(err);
        res.status(200).json(rows);
    });
});

// Add a course
// "/courses/add" + {course_name} =>
// {course_id, course_name}
app.post('/courses/add', (req, res, next) => {
    const course_name = req.body.course_name;
    db.run(Q_CREATE_COURSE, [course_name], function(err) {
        if (err) return next(err);
        const course_id = this.lastID;
        const code = 201;
        const result = {
            course_id,
            course_name
        };
        res.status(code).json(result);
    });
});

// Update a course
// "/courses/update/<course_id>" + {course_name} =>
// {course_id, course_name}
app.post('/courses/update/:course_id', (req, res, next) => {
    const course_id = req.params.course_id;
    const course_name = req.body.course_name;
    db.run(Q_UPDATE_COURSE, [course_name, course_id], function(err) {
        if (err) return next(err);
        const code = 200;
        const result = {
            course_id,
            course_name
        };
        res.status(code).json(result);
    });
});

// Delete a course
// "/courses/<course_id>" =>
// [{course_id, course_name}*]
app.delete('/courses/:course_id', (req, res, next) => {
    db.run(Q_DELETE_COURSE, [req.params.course_id], (err, rows) => {
        if (err) return next(err);
        db.all(Q_GET_ALL_COURSES, (err, rows) => {
            if (err) return next(err);
            res.status(200).json(rows);
        });
    });
});

// List all offerings of a course.
// "/offerings/<course_id>" =>
// [{course_id, course_name, offering_id, start_date}*]
// where 'start_date' is the date of the earliest class.
app.get('/offerings/:course_id', (req, res, next) => {
    db.all(Q_GET_ALL_OFFERINGS_OF_COURSE, [req.params.course_id], (err, rows) => {
        if (err) return next(err);
        res.status(200).json(rows);
    });
});

// Add an offering for a course.
// "/offerings/<course_id>" + {class_date, class_time} =>
// {course_id, course_name, offering_id, class_date, class_time}
app.post('/offerings/:course_id', (req, res, next) => {
    const course_id = parseInt(req.params.course_id);
    const class_date = req.body.start_date;
    const class_time = req.body.start_time;
    db.run(Q_CREATE_OFFERING, [course_id], function(err) {
        if (err) return next(err);
        const offering_id = this.lastID;
        db.run(Q_CREATE_CLASS, [offering_id, class_date, class_time], function(err) {
            if (err) return next(err);
            const code = 201;
            let result = {
                course_id,
                offering_id,
                start_date: class_date,
            };
            db.get(Q_GET_COURSE_OF_OFFERING, [offering_id], function(err, row) {
                if (err) return next(err);
                result['course_name'] = row['course_name'];
                result['class_date'] = row['class_date'];
                res.status(code).json(result);
            });
        });
    });
});

// Delete an offering
// "/offerings/<offering_id>" =>
// [{course_id, course_name, offering_id, start_date}*]
// where 'start_date' is the date of the earliest class.
app.delete('/offerings/:offering_id', (req, res, next) => {
    db.get(Q_GET_COURSE_OF_OFFERING, [req.params.offering_id], (err, row) => {
        if (err) return next(err);
        const course_id = row['course_id'];
        db.run(Q_DELETE_OFFERING, [req.params.offering_id], (err, rows) => {
            if (err) return next(err);
            db.all(Q_GET_ALL_OFFERINGS_OF_COURSE, [course_id], (err, rows) => {
                if (err) return next(err);
                res.status(200).json(rows);
            });
        });
    });
});

// List all classes for a particular offering.
// "/classes/<offering_id>" =>
// [{course_id, course_name, offering_id, class_id, class_date, class_time}*]
app.get('/classes/:offering_id', (req, res, next) => {
    db.all(Q_GET_ALL_CLASSES_OF_OFFERING, [req.params.offering_id], (err, rows) => {
        if (err) return next(err);
        res.status(200).json(rows);
    });
});

// Add a class for an offering.
// "/classes/<offering_id>" + {class_date, class_time} =>
// {course_id, course_name, offering_id, class_id, class_date, class_time}
app.post('/classes/:offering_id', (req, res, next) => {
    const offering_id = parseInt(req.params.offering_id);
    const class_date = req.body.class_date;
    const class_time = req.body.class_time;
    db.run(Q_CREATE_CLASS, [offering_id, class_date, class_time], function(err) {
        if (err) return next(err);
        const code = 201;
        const class_id = this.lastID;
        let result = {
            offering_id,
            class_id,
            class_date,
            class_time
        };
        db.get(Q_GET_OFFERING_OF_CLASS, [class_id], function(err, row) {
            if (err) return next(err);
            result['course_id'] = row['course_id'];
            result['course_name'] = row['course_name'];
            res.status(code).json(result);
        });
    });
});

// Delete a class
// "/classes/<class_id>" =>
// [{course_id, course_name, offering_id, class_id, class_date, class_time}*]
app.delete('/classes/:class_id', (req, res, next) => {
    db.get(Q_GET_OFFERING_OF_CLASS, [req.params.class_id], (err, row) => {
        if (err) return next(err);
        const offering_id = row['offering_id'];
        db.run(Q_DELETE_CLASS, [req.params.class_id], (err, rows) => {
            if (err) return next(err);
            db.all(Q_GET_ALL_CLASSES_OF_OFFERING, [offering_id], (err, rows) => {
                if (err) return next(err);
                res.status(200).json(rows);
            });
        });
    });
});

// Run
app.listen(port, () => {console.log('listening...');});
