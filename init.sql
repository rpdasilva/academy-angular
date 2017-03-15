-- All courses that have ever existed.
create table Course(
       ident	integer not null primary key,
       name	varchar(255) not null
);

insert into Course values(1, "Creating Bugs");
insert into Course values(2, "Unusable Interfaces");

-- All people that have ever existed.
create table Person(
       ident	integer not null primary key,
       personal	varchar(255) not null,
       family	varchar(255) not null,
       email	varchar(255) not null
);

insert into Person values(1, "Kay", "McNulty", "k.mcn@eniac.org");
insert into Person values(2, "Betty", "Jennings", "b.jen@eniac.org");
insert into Person values(3, "Betty", "Snyder", "b.sny@eniac.org");
insert into Person values(4, "Marlyn", "Wescoff", "m.wes@eniac.org");
insert into Person values(5, "Fran", "Bilas", "f.bil@eniac.org");
insert into Person values(6, "Ruth", "Lichterman", "r.lic@eniac.org");
