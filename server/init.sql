-- All courses that have ever existed.
create table Course(
       ident		text unique not null primary key,
       name		text not null
);

insert into Course values("BUGS101", "Writing Bugs for Fun and Profit");
insert into Course values("UX200", "Creating Confusing User Interfaces");

-- All offerings of all courses.
create table Offering(
       ident		integer unique not null primary key,
       course		text not null references Course(ident)
);

insert into Offering values(1, "BUGS101"); -- BUGS101 #1
insert into Offering values(2, "BUGS101"); -- BUGS101 #2
insert into Offering values(3, "BUGS101"); -- BUGS101 #3
insert into Offering values(4, "UX200"); -- UX200 #1
insert into Offering values(5, "UX200"); -- UX200 #2

-- When offerings occurred (to handle multi-part courses).
create table Class(
	ident		integer unique not null primary key,
	offering	integer not null references Offering(ident),
	calendar	text not null, -- YYYY-MM-DD
	starting	text not null   -- HH:MM (24-hour clock)
);

insert into Class values(1, 1, '2017-01-01', '09:00'); -- BUGS101 #1 only class
insert into Class values(2, 2, '2017-01-03', '13:00'); -- BUGS101 #2 only class
insert into Class values(3, 3, '2017-01-04', '09:00'); -- BUGS101 #3 class 1
insert into Class values(4, 3, '2017-01-04', '14:00'); -- BUGS101 #3 class 2
insert into Class values(5, 4, '2017-01-03', '13:00'); -- UX200 #1 only class
insert into Class values(6, 4, '2017-02-15', '10:00'); -- UX200 #2 class 2
insert into Class values(7, 4, '2017-02-14', '10:00'); -- UX200 #2 class 1 (out of order)

-- All people that have ever existed.
create table Person(
       ident		integer unique not null primary key,
       personal		text not null,
       family		text not null,
       email		text not null
);

insert into Person values(1, "Kay", "McNulty", "k.mcn@eniac.org");
insert into Person values(2, "Betty", "Jennings", "b.jen@eniac.org");
insert into Person values(3, "Betty", "Snyder", "b.sny@eniac.org");
insert into Person values(4, "Marlyn", "Wescoff", "m.wes@eniac.org");
insert into Person values(5, "Fran", "Bilas", "f.bil@eniac.org");
insert into Person values(6, "Ruth", "Lichterman", "r.lic@eniac.org");

-- Roles people can have in courses.
create table Role(
	ident		integer unique not null primary key,
	name		text not null
);

insert into Role values(1, "instructor");
insert into Role values(2, "learner");

-- Activities (roles people had in particular offerings).
create table Activity(
	ident		integer unique not null primary key,
	offering	integer not null references Offering(ident),
	person		integer not null references Person(ident),
	role		integer not null references Role(ident)
);

insert into Activity values( 1, 1, 1, 1); -- BUGS101 #1 McNulty instructor
insert into Activity values( 2, 1, 2, 2); -- BUGS101 #1 Jennings learner
insert into Activity values( 3, 1, 3, 2); -- BUGS101 #1 Snyder learner

insert into Activity values( 4, 2, 1, 1); -- BUGS101 #2 McNulty instructor
insert into Activity values( 5, 2, 5, 2); -- BUGS101 #1 Bilas learner

insert into Activity values( 6, 3, 2, 1); -- BUGS101 #3 Jennings instructor
insert into Activity values( 7, 3, 3, 2); -- BUGS101 #3 Snyder learner (repeat)
insert into Activity values( 8, 3, 4, 2); -- BUGS101 #3 Wescoff learner

insert into Activity values( 9, 4, 1, 2); -- UX200 #1 McNulty learner
insert into Activity values(10, 4, 2, 2); -- UX200 #1 Jennings learner
insert into Activity values(11, 4, 5, 1); -- UX200 #1 Bilas instructor
insert into Activity values(12, 4, 6, 1); -- UX200 #1 Lichterman instructor

insert into Activity values(13, 4, 3, 2); -- UX200 #1 Snyder learner
insert into Activity values(14, 4, 4, 2); -- UX200 #1 Wescoff learner
insert into Activity values(15, 5, 6, 1); -- UX200 #2 Lichterman instructor
insert into Activity values(16, 5, 5, 1); -- UX200 #2 Bilas instructor
