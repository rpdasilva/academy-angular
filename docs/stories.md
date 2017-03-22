# Academy

## User Interface Elements

1.  *CourseList* displays all courses in order of addition to system.

1.  *OfferingList* displays all offerings for currently-selected course
    ordered by starting date.
    -   If no course is currently selected, *OfferingList* is not shown.

1.  *ClassList* displays all classes for currently-selected offering
    ordered by date and time.
    -   If no course or no offering is currently selected, *ClassList*
        is not shown.

## Interaction Stories

1.  **Display courses**
    -   User:
        -   Goes to "/".
    -   Site:
        -   Displays *CourseList* showing all known courses.

1.  **Display offerings**
    -   User:
        -   Clicks on *course_id* in *CourseList*.
    -   Site:
        -   Displays *CourseList* with current course highlighted.
        -   Displays *OfferingList* showing all offerings for the current course.

1.  **Display classes**
    -   User:
        -   Clicks on *class_id* in *OfferingList*.
    -   Site
        -   Displays *CourseList* with current course highlighted.
        -   Displays *OfferingList* with current offering highlighted.
        -   Displays *ClassList* showing all classes for the current offering.
    -   When the user selects a new course, the class display is hidden.

1.  **Add course**
    -   User:
        -   Enters *course_name* for new course.
        -   Clicks "Add".
    -   Site if successful:
        -   Displays *CourseList* with new course.
        -   Displays *OfferingList* with no offerings.
        -   Hides *ClassList*.
    -   Site if error (duplicate course name):
        -   Displays error message.
        -   Hides *OfferingList*.
        -   Hides *ClassList*.

1.  **Add offering**
    -   User:
        -   Enters *class_date* and *class_time* of offering's first class.
        -   Clicks "Add".
    -   Site if successful:
        -   Displays *CourseList* with current course highlighted.
        -   Displays *OfferingList* with new offering highlighted.
        -   Displays *ClassList* showing first class for new offering.
    -   Site if error (duplicate date/time):
        -   Displays error message.
        -   Clears *ClassList*.

1.  **Add class**
    -   User:
        -   Enters *class_date* and *class_time* of new class.
        -   Clicks "Add".
    -   Site if successful:
        -   Displays *CourseList* with current course highlighted.
        -   Displays *OfferingList* with current offering highlighted.
        -   Displays *ClassList* with new class highlighted.
    -   Site if error (duplicate date/time):
        -   Displays error message.

1.  **Delete course**
    -   User:
        -   Selects *course_id* for course to be deleted.
        -   Clicks "Remove".
    -   Site:
        -   Displays *CourseList* without deleted course and with nothing highlighted.
        -   Clears *OfferingList* (since no course is currently selected).
        -   Clears *ClassList* (since no course is currently selected).

1.  **Delete offering**
    -   User:
        -   Selects *offering_id* for offering to be deleted.
        -   Clicks "Remove".
    -   Site:
        -   Displays *CourseList* with current course highlighted.
        -   Displays *OfferingList* for current course without deleted offering and with nothing highlighted.
        -   Clears *ClassList* (since no offering is currently selected).

1.  **Delete class**
    -   User:
        -   Selects *class_id* for class to be deleted.
        -   Clicks "Remove".
    -   Site:
        -   Displays *CourseList* with current course highlighted.
        -   Displays *OfferingList* without current offering highlighted.
        -   Displays *ClassList* for current offering without deleted class and with nothing highlighted.
