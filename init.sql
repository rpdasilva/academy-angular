-- All courses that have ever existed.
create table Course(
       ident		integer not null primary key,
       name		varchar(255) not null
);

insert into Course values(1, "Bugs");
insert into Course values(2, "Confusion");

-- All offerings of all courses.
create table Offering(
       ident		integer not null primary key,
       course		integer not null references Course(ident)
);

insert into Offering values(1, 1); -- Bugs 1
insert into Offering values(2, 1); -- Bugs 2
insert into Offering values(3, 1); -- Bugs 3
insert into Offering values(4, 2); -- Confusion 1
insert into Offering values(5, 2); -- Confusion 2

-- When offerings occurred (to handle multi-part courses).
create table Class(
	ident		integer not null primary key,
	offering	integer not null references Offering(ident),
	calendar	varchar(10) not null, -- YYYY-MM-DD
	starting	varchar(5) not null   -- HH:MM (24-hour clock)
);

insert into Class values(1, 1, '2017-01-01', '09:00'); -- Bugs #1 only class
insert into Class values(2, 2, '2017-01-03', '13:00'); -- Bugs #2 only class
insert into Class values(3, 3, '2017-01-04', '09:00'); -- Bugs #3 class 1
insert into Class values(4, 3, '2017-01-04', '14:00'); -- Bugs #3 class 2
insert into Class values(5, 4, '2017-01-03', '13:00'); -- Confusion #1 only class
insert into Class values(6, 4, '2017-02-15', '10:00'); -- Confusion #2 class 2
insert into Class values(7, 4, '2017-02-14', '10:00'); -- Confusion #2 class 1 (out of order)

-- All people that have ever existed.
create table Person(
       ident		integer not null primary key,
       personal		varchar(255) not null,
       family		varchar(255) not null,
       email		varchar(255) not null
);

insert into Person values(1, "Kay", "McNulty", "k.mcn@eniac.org");
insert into Person values(2, "Betty", "Jennings", "b.jen@eniac.org");
insert into Person values(3, "Betty", "Snyder", "b.sny@eniac.org");
insert into Person values(4, "Marlyn", "Wescoff", "m.wes@eniac.org");
insert into Person values(5, "Fran", "Bilas", "f.bil@eniac.org");
insert into Person values(6, "Ruth", "Lichterman", "r.lic@eniac.org");

-- Roles people can have in courses.
create table Role(
	ident		integer not null primary key,
	name		varchar(255) not null
);

insert into Role values(1, "instructor");
insert into Role values(2, "learner");

-- Activities (roles people had in particular offerings).
create table Activity(
	ident		integer not null primary key,
	offering	integer not null references Offering(ident),
	person		integer not null references Person(ident),
	role		integer not null references Role(ident)
);

insert into Activity values( 1, 1, 1, 1); -- Bugs #1 McNulty instructor
insert into Activity values( 2, 1, 2, 2); -- Bugs #1 Jennings learner
insert into Activity values( 3, 1, 3, 2); -- Bugs #1 Snyder learner

insert into Activity values( 4, 2, 1, 1); -- Bugs #2 McNulty instructor
insert into Activity values( 5, 2, 5, 2); -- Bugs #1 Bilas learner

insert into Activity values( 6, 3, 2, 1); -- Bugs #3 Jennings instructor
insert into Activity values( 7, 3, 3, 2); -- Bugs #3 Snyder learner (repeat)
insert into Activity values( 8, 3, 4, 2); -- Bugs #3 Wescoff learner

insert into Activity values( 9, 4, 1, 2); -- Confusion #1 McNulty learner
insert into Activity values(10, 4, 2, 2); -- Confusion #1 Jennings learner
insert into Activity values(11, 4, 5, 1); -- Confusion #1 Bilas instructor
insert into Activity values(12, 4, 6, 1); -- Confusion #1 Lichterman instructor

insert into Activity values(13, 4, 3, 2); -- Confusion #1 Snyder learner
insert into Activity values(14, 4, 4, 2); -- Confusion #1 Wescoff learner
insert into Activity values(15, 5, 6, 1); -- Confusion #2 Lichterman instructor
insert into Activity values(16, 5, 5, 1); -- Confusion #2 Bilas instructor
