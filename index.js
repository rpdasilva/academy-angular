// Load required modules.
const winston = require('winston');
const express = require('express');
const expressWinston = require('express-winston');
const sqlite3 = require('sqlite3');

// Main objects.
const port = 3654;
const path = 'db.sqlite3';
const app = express();
const db = new sqlite3.Database(path, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
	console.log(`DATABASE ERROR ${err}`);
    }
});

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
      <li><a href="/offerings">/offerings</a></li>
      <li><a href="/classes/1">/classes/1</a></li>
    </ul>
  </body>
</html>
    `);
});

// List all courses
// => [{'course_ident': integer, 'course_name': string}, ...]
app.get('/courses', (req, res, next) => {
    const query = `
select
    Course.ident as course_ident,
    Course.name  as course_name
from
    Course;
    `;
    db.all(query, (err, rows) => {
	if (err) return next(err);
	res.status(200).json(rows);
    });
});

// List all offerings of all courses.
// => [{'course_ident': integer, 'course_name': string, 'offering_ident': integer}]
app.get('/offerings', (req, res, next) => {
    const query = `
select
    Course.ident   as course_ident,
    Course.name    as course_name,
    Offering.ident as offering_ident
from
    Course join Offering
on
    Offering.course = Course.ident
    `;
    db.all(query, (err, rows) => {
	if (err) return next(err);
	res.status(200).json(rows);
    });
});

// List all classes for a particular offering.
// => [{'course_ident': integer, 'course_name': string, 'offering_ident': integer,
//      'class_ident': integer, 'calendar': date, 'starting': time}]
app.get('/classes/:q_course_ident', (req, res, next) => {
    const query = `
select
    Course.ident   as course_ident,
    Course.name    as course_name,
    Offering.ident as offering_ident,
    Class.ident    as class_ident,
    Class.calendar as calendar,
    Class.starting as starting
from
    Course join Offering join Class
on
    Course.ident   = Offering.course and
    Offering.ident = Class.offering
where
    Course.ident   = ?
    `;
    db.all(query, [req.params.q_course_ident], (err, rows) => {
	if (err) return next(err);
	res.status(200).json(rows);
    });
});

// Run
app.listen(port, () => {console.log('listening...');});
