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

// Links to all endpoints.
// => HTML
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
// / =>
// [{course_ident, course_name}, ...]
app.get('/courses', (req, res, next) => {

    const query_select = `
select
    Course.ident	as course_ident,
    Course.name		as course_name
from
    Course;
    `;

    db.all(query_select, (err, rows) => {
	if (err) return next(err);
	res.status(200).json(rows);
    });
});

// Add a course
// / + {'course_name': string} =>
// {course_ident, course_name}
app.post('/courses', (req, res, next) => {

    const query_create = `
insert into Course(name) values(?);
    `;

    const name = req.body.course_name;
    db.run(query_create, [name], function(err) {
	if (err) return next(err);
	const course_ident = this.lastID;
	const code = 201;
	const result = {'course_ident': course_ident, 'course_name': name};
        res.status(code).json(result);
    });
});

// List all offerings of a course.
// /offerings/{course_ident} =>
// [{course_ident, course_name, offering_ident, start_date}, ...]
// where 'start_date' is the date of the earliest class.
app.get('/offerings/:q_course_ident', (req, res, next) => {

    const query_select = `
select
    Course.ident	as course_ident,
    Course.name		as course_name,
    Offering.ident	as offering_ident,
    min(Class.calendar)	as start_date
from
    Course join Offering join Class
on
    Offering.course = Course.ident and
    Offering.ident = Class.offering
where
    Course.ident = ?
group by
    Offering.ident;
    `;

    db.all(query_select, [req.params.q_course_ident], (err, rows) => {
	if (err) return next(err);
	res.status(200).json(rows);
    });
});

// Add an offering for a course.
// /offerings + {'course_ident': ident, 'start_date': date, 'start_time': time} =>
// {course_ident, course_name, offering_ident, start_date, start_time}
app.post('/offerings', (req, res, next) => {

    const query_create_offering = `
insert into Offering(course) values(?);
    `;

    const query_create_class = `
insert into Class(offering, calendar, starting) values(?, ?, ?);
    `;

    const query_select = `
select
    Course.name		as course_name,
    min(Class.calendar)	as start_date
from
    Course join Offering join Class
on
    Offering.course = Course.ident and
    Offering.ident = Class.offering
where
    Course.ident = ? and
    Offering.ident = ?
group by
    Offering.ident;
    `;

    const course_ident = parseInt(req.body.course_ident);
    const start_date = req.body.start_date;
    const start_time = req.body.start_time;
    db.run(query_create_offering, [course_ident], function(err) {
	if (err) return next(err);
	const offering_ident = this.lastID;
	db.run(query_create_class, [offering_ident, start_date, start_time], function(err) {
	    if (err) return next(err);
    	    const code = 201;
	    let result = {
		course_ident: course_ident,
		offering_ident: offering_ident,
		start_date: start_date
	    };
	    db.get(query_select, [course_ident, offering_ident], function(err, row) {
		if (err) return next(err);
		result['course_name'] = row['course_name'];
		result['start_date'] = row['start_date'];
		res.status(code).json(result);
	    });
	});
    });
});

// List all classes for a particular offering.
// /classes/{offering_ident} =>
// [{course_ident, course_name, offering_ident, class_ident, calendar, starting}, ...]
app.get('/classes/:q_offering_ident', (req, res, next) => {

    const query_select = `
select
    Course.ident	as course_ident,
    Course.name		as course_name,
    Offering.ident	as offering_ident,
    Class.ident		as class_ident,
    Class.calendar	as calendar,
    Class.starting	as starting
from
    Course join Offering join Class
on
    Course.ident   = Offering.course and
    Offering.ident = Class.offering
where
    Offering.ident = ?
    `;

    db.all(query_select, [req.params.q_offering_ident], (err, rows) => {
	if (err) return next(err);
	res.status(200).json(rows);
    });
});

// Run
app.listen(port, () => {console.log('listening...');});
