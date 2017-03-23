// Load required modules.
const winston = require('winston');
const express = require('express');
const bodyParser = require('body-parser');
const expressWinston = require('express-winston');
const sqlite3 = require('sqlite3');
const path = require('path');
const cors = require('cors'); // https://github.com/rangle/hub/wiki/CORS

// Main objects.
const port = 3654;
const db_path = path.join(__dirname, 'academy.db');
const app = express();
const db = new sqlite3.Database(db_path, sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.log(`DATABASE ERROR ${err}`);
});

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

// Links to all endpoints for testing purposes.
// "/" =>
// HTML
app.get('/', (req, res, next) => {
    res.status(200).send(`
<html>
  <body>
    <ul>
      <li><a href="/courses">/courses</a></li>
      <li><a href="/offerings/1">/offerings/1</a></li>
      <li><a href="/classes/1">/classes/1</a></li>
    </ul>
  </body>
</html>
    `);
});

// List all courses
// "/courses" =>
// [{course_id, course_name}*]
app.get('/courses', (req, res, next) => {

    const query_select = `
select
    Course.ident                as course_id,
    Course.course_name          as course_name
from
    Course;
    `;

    db.all(query_select, (err, rows) => {
        if (err) return next(err);
        res.status(200).json(rows);
    });
});

// Add a course
// "/courses" + {course_name} =>
// {course_id, course_name}
app.post('/courses', (req, res, next) => {

    const query_create = `
insert into Course(course_name) values(?);
    `;

    const course_name = req.body.course_name;
    db.run(query_create, [course_name], function(err) {
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

// Delete a course
// "/courses/<course_id>" =>
// [{course_id, course_name}*]
app.delete('/courses/:course_id', (req, res, next) => {

    const query_delete = `
delete from
    Course
where
    ident = ?;
    `;

    const query_select = `
select
    Course.ident                as course_id,
    Course.course_name          as course_name
from
    Course;
    `;

    db.run(query_delete, [req.params.course_id], (err, rows) => {
        if (err) return next(err);
        db.all(query_select, (err, rows) => {
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

    const query_select = `
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

    db.all(query_select, [req.params.course_id], (err, rows) => {
        if (err) return next(err);
        res.status(200).json(rows);
    });
});

// Add an offering for a course.
// "/offerings/<course_id>" + {class_date, class_time} =>
// {course_id, course_name, offering_id, class_date, class_time}
app.post('/offerings/:course_id', (req, res, next) => {

    const query_create_offering = `
insert into Offering(course_id) values(?);
    `;

    const query_create_class = `
insert into Class(offering_id, class_date, class_time) values(?, ?, ?);
    `;

    const query_select = `
select
    Course.course_name          as course_name,
    min(Class.class_date)       as start_date
from
    Course join Offering join Class
on
    Offering.course_id = Course.ident
and
    Class.offering_id = Offering.ident
where
    Course.ident = ? and
    Offering.ident = ?
group by
    Offering.ident;
    `;

    const course_id = parseInt(req.params.course_id);
    const class_date = req.body.start_date;
    const class_time = req.body.start_time;
    db.run(query_create_offering, [course_id], function(err) {
        if (err) return next(err);
        const offering_id = this.lastID;
        db.run(query_create_class, [offering_id, class_date, class_time], function(err) {
            if (err) return next(err);
            const code = 201;
            let result = {
                course_id,
                offering_id,
                start_date: class_date,
            };
            db.get(query_select, [course_id, offering_id], function(err, row) {
                if (err) return next(err);
                result['course_name'] = row['course_name'];
                result['class_date'] = row['class_date'];
                res.status(code).json(result);
            });
        });
    });
});

// List all classes for a particular offering.
// "/classes/<offering_id>" =>
// [{course_id, course_name, offering_id, class_id, class_date, class_time}*]
app.get('/classes/:offering_id', (req, res, next) => {

    const query_select = `
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

    db.all(query_select, [req.params.offering_id], (err, rows) => {
        if (err) return next(err);
        res.status(200).json(rows);
    });
});

// Add a class for an offering.
// "/classes/<offering_id>" + {class_date, class_time} =>
// {course_id, course_name, offering_id, class_id, class_date, class_time}
app.post('/classes/:offering_id', (req, res, next) => {

    const query_create_class = `
insert into Class(offering_id, class_date, class_time) values(?, ?, ?);
    `;

    const query_select = `
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

    const offering_id = parseInt(req.params.offering_id);
    const class_date = req.body.class_date;
    const class_time = req.body.class_time;
    db.run(query_create_class, [offering_id, class_date, class_time], function(err) {
        if (err) return next(err);
        const code = 201;
        const class_id = this.lastID;
        let result = {
            offering_id,
            class_id,
            class_date,
            class_time
        };
        db.get(query_select, [class_id], function(err, row) {
            if (err) return next(err);
            result['course_id'] = row['course_id'];
            result['course_name'] = row['course_name'];
            res.status(code).json(result);
        });
    });
});

// Run
app.listen(port, () => {console.log('listening...');});
