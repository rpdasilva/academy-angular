pragma foreign_keys = on;

-- All courses that have ever existed.
create table Course(
	ident		integer unique not null primary key,
	course_name	text unique not null
);

insert into Course values(1, "Writing Bugs for Fun and Profit");
insert into Course values(2, "Creating Confusing User Interfaces");

-- All offerings of all courses.
create table Offering(
	ident		integer unique not null primary key,
	course_id	integer not null,
	foreign key(course_id) references Course(ident) on delete cascade
);

insert into Offering values(1, 1); -- Bugs #1
insert into Offering values(2, 1); -- Bugs #2
insert into Offering values(3, 1); -- Bugs #3
insert into Offering values(4, 2); -- UX #1
insert into Offering values(5, 2); -- UX #2

-- When offerings occurred (to handle multi-part courses).
create table Class(
	ident		integer unique not null primary key,
	offering_id	integer not null,
	class_date	text not null, -- YYYY-MM-DD
	class_time	text not null, -- HH:MM (24-hour clock)
	foreign key(offering_id) references Offering(ident) on delete cascade
);

insert into Class values(1, 1, '2017-01-01', '09:00'); -- Bugs #1 only class
insert into Class values(2, 2, '2017-01-03', '13:00'); -- Bugs #2 only class
insert into Class values(3, 3, '2017-01-04', '09:00'); -- Bugs #3 class 1
insert into Class values(4, 3, '2017-01-04', '14:00'); -- Bugs #3 class 2
insert into Class values(5, 4, '2017-01-03', '13:00'); -- UX #1 only class
insert into Class values(6, 5, '2017-02-15', '10:00'); -- UX #2 class 2
insert into Class values(7, 5, '2017-02-14', '10:00'); -- UX #2 class 1 (out of order)

-- All people that have ever existed.
create table Person(
	ident		text unique not null primary key,
	personal_name	text not null,
	family_name	text not null,
	email		text not null
);

insert into Person values("k.mcn", "Kay", "McNulty", "k.mcn@eniac.org");
insert into Person values("b.jen", "Betty", "Jennings", "b.jen@eniac.org");
insert into Person values("b.sny", "Betty", "Snyder", "b.sny@eniac.org");
insert into Person values("m.wes", "Marlyn", "Wescoff", "m.wes@eniac.org");
insert into Person values("f.bil", "Fran", "Bilas", "f.bil@eniac.org");
insert into Person values("r.lic", "Ruth", "Lichterman", "r.lic@eniac.org");
insert into Person values("mh", "Margaret", "Hamilton", "mh@usl.org");

-- Roles people can have in particular offerings.
create table Role(
	ident		text unique not null primary key,
	role_name	text not null
);

insert into Role values("INS", "instructor");
insert into Role values("LRN", "learner");

-- Activities (roles people had in particular offerings).
create table Activity(
	ident		integer unique not null primary key,
	offering_id	integer not null references Offering(ident),
	person_id	integer not null references Person(ident),
	role_id		integer not null references Role(ident)
);

insert into Activity values( 1, 1, "k.mcn", "INS"); -- Bugs #1 McNulty instructor
insert into Activity values( 2, 1, "b.jen", "LRN"); -- Bugs #1 Jennings learner
insert into Activity values( 3, 1, "b.sny", "LRN"); -- Bugs #1 Snyder learner

insert into Activity values( 4, 2, "k.mcn", "INS"); -- Bugs #2 McNulty instructor
insert into Activity values( 5, 2, "f.bil", "LRN"); -- Bugs #1 Bilas learner

insert into Activity values( 6, 3, "b.jen", "INS"); -- Bugs #3 Jennings instructor
insert into Activity values( 7, 3, "b.sny", "LRN"); -- Bugs #3 Snyder learner (repeat)
insert into Activity values( 8, 3, "m.wes", "LRN"); -- Bugs #3 Wescoff learner

insert into Activity values( 9, 4, "k.mcn", "LRN"); -- UX #1 McNulty learner
insert into Activity values(10, 4, "b.jen", "LRN"); -- UX #1 Jennings learner
insert into Activity values(11, 4, "f.bil", "INS"); -- UX #1 Bilas instructor
insert into Activity values(12, 4, "r.lic", "INS"); -- UX #1 Lichterman instructor

insert into Activity values(13, 4, "b.sny", "LRN"); -- UX #1 Snyder learner
insert into Activity values(14, 4, "m.wes", "LRN"); -- UX #1 Wescoff learner
insert into Activity values(15, 5, "r.lic", "INS"); -- UX #2 Lichterman instructor
insert into Activity values(16, 5, "f.bil", "INS"); -- UX #2 Bilas instructor

-- Involvement (people can be qualified as instructors or be interested in a course).
create table Involvement(
	ident		integer unique not null primary key,
	course_id	integer not null references Course(ident),
	person_id	integer not null references Person(ident),
	role_id		integer not null references Role(ident)
);

insert into Involvement values( 1, 1, "k.mcn", "INS");
insert into Involvement values( 2, 1, "b.jen", "LRN"); -- was learner...
insert into Involvement values( 3, 1, "b.jen", "INS"); -- ...became instructor
insert into Involvement values( 4, 1, "b.sny", "LRN");
insert into Involvement values( 5, 1, "f.bil", "LRN");
-- "m.wes" never registered interest in Bugs but took it anyway
insert into Involvement values( 6, 2, "f.bil", "INS");
insert into Involvement values( 7, 2, "r.lic", "INS");
insert into Involvement values( 8, 2, "k.mcn", "LRN");
-- "b.jen" never registered interest in UX but took it anyway
insert into Involvement values( 9, 2, "b.sny", "LRN");
insert into Involvement values(10, 2, "m.wes", "LRN");
insert into Involvement values(11, 1, "mh", "INS"); -- qualified to teach but never has
insert into Involvement values(12, 2, "mh", "INS"); -- ditto
