## Stories

**UserLogsIn**
- pre
  - _User_ is not logged in
- sequence
  - _User_ attempts to view any page in _Site_
  - _Site_ redirects _User_ to *LoginPage*
  - _User_ enters credentials
  - if:
    - login successful: _Site_ logs user in
    - login unsuccessful: _Site_ redisplays *LoginPage*
  - _Site_ presents user with originally-requested page
- post
  - _User_ is logged in

**UserLogsOut**
- pre
  - _User_ is logged in
- sequence
  - _User_ clicks "logout" link in *Header*
  - _Site_ logs user out
  - _Site_ displays *LoginPage*
- post
  - _User_ is logged out

**RegisterAsInstructorForCourse**
- FIXME

**RegisterInterestInCourse**
- FIXME

**ViewCourse**
- pre
  - _User_ is logged in
- sequence
  - _User_ clicks link for _Course_ (_Course_ names always link to course pages)
  - _System_ displays *CoursePage:Course*

## Pages

- *CoursePage*
  - displays information for *Course*
  - displays information about past involvement of _User_ in _Course_
  - link => *RegisterInterestInCourse*
  - link => *RegisterAsInstructorForCourse*
- *HomePage*: assume _User_ is logged in (since **UserLogsIn** requires login for all pages)
  - _Involvement:Instructor_ @ _User_ (what they can teach)
  - _Involvement:Learner_ @ _User_ (what they want to take)
    - marked if they have taken a class of this kind already
  - _Course:Instructor_ @ _User_ (what they have taught)
  - _Course:Learner_ @ _User_ (what they have taken)
- *LoginPage*
  - allows login

## Components

- *Header*: only displayed when _User_ is logged in
  - _User_ ID
  - "logout" link

- *Footer*
  - version information
  - link to GitHub site
  - "mailto" for filing bug reports etc.

## Questions

- support GitHub login?
- *only* support GitHub login?
