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
// / + {'course_name': name} =>
// {'course_ident': ident, 'course_name': name}
app.post('/courses', (req, res, next) => {
    const query_insert = `
insert into Course(name) values(?);
    `;
    const name = req.body.course_name;
    db.run(query_insert, [name], function(err, rows) {
	if (err) return next(err);
	const code = 201;
	const result = {'course_ident': this.lastID, 'course_name': name};
        res.status(500).json(result);
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
    Offering.ident
    `;
    db.all(query_select, [req.params.q_course_ident], (err, rows) => {
	if (err) return next(err);
	res.status(200).json(rows);
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
