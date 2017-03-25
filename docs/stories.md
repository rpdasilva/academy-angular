# Academy

## User Interface Elements

1. *CourseList* displays all courses in order of addition to system.
   - Ordered by class ID.
   - Class ID is selectable.
   - Class name is editable in place.
   - "New Course" requires:
      - Course name (must be unique).

1. *OfferingList* displays all offerings for currently-selected course.
   - If no course is currently selected, *OfferingList* is not shown.
   - Title displays course name.
   - Title displays count of classes.
   - Ordered by offering ID.
   - Ordering ID is selectable.
   - "New Offering" requires:
      - nothing

1. *ClassList* displays all classes for currently-selected offering.
   - If no offering is currently selected, *ClassList* is not shown.
   - Title displays course name.
   - Title displays offering ID.
   - Ordered by class ID.
   - Class ID is selectable.
   - "New Class" requires:
      - Date and time (must be unique).

## Interaction Stories

1. **Display courses**
   - User
     - Goes to "/".
   - Site
     - Displays *CourseList* showing all courses.

1. **Display offerings**
   - User
     - Clicks a *course_id* in *CourseList*.
   - Site
     - Sets *CurrentCourse* to selected course.
     - Highlights *CurrentCourse* in *CourseList*.
     - Displays *OfferingList* showing offerings for *CurrentCourse*.

1. **Display classes**
   - User
     - Clicks a *class_id* in *OfferingList*.
   - Site
     - Sets *CurrentOffering* to selected offering.
     - Highlights *CurrentOffering* in *OfferingList*.
     - Displays *ClassList* showing classes for *CurrentOffering*.

1. **Add course**
   - User
     - Enters *course_name* for new course.
     - Clicks "Add Class".
   - Site if successful (unique name):
     - Displays *CourseList* with new course added.
     - Highlights new course in *CourseList*.
     - Sets *CurrentCourse* to new course.
     - Displays *OfferingList* for new course.
       - Should have 0 offerings.
     - Hides *ClassList* (since no offering selected).
     - **Persists new course.**
   - Site if error (duplicate course name):
     - Displays error message.
     - Leaves (incorrect) name in input for editing.
     - Unsets *CurrentCourse*.
       - Hides *OfferingList* and *ClassList* as side effect.

1. **Add offering**
   - Pre
     - *CurrentCourse* is set (so *OfferingList* is visible).
   - User
     - Clicks "New Offering".
   - Site if successful:
     - Displays *OfferingList* with new offering added.
     - Highlights new offering in *OfferingList*.
     - Sets *CurrentOffering* to new offering.
     - Displays *ClassList* for new offering.
       - Should have - classes.
     - **Persists new offering.**

1. **Add class**
   - Pre
     - *CurrentOfering* is set (so *ClassList* is visible).
   - User
     - Enters *class_date* and *class_time* of new class.
     - Clicks "Add Class".
   - Site if successful (unique date/time within offering):
     - Displays *ClassList* with new class added.
     - **Persists new class.**
   - Site if error (duplicate date/time):
     - Displays error message.
     - Leaves (duplicate) date/time in inputs for editing.

1. **Delete course**
   - User
     - Selects course to be deleted.
     - Clicks "Delete".
   - Site
     - Displays *CourseList* without deleted course.
     - Unsets *CurrentCourse*.
       - Hides *OfferingList* as side effect.
       - Hides *ClassList* as side effect.
     - **Deletes course along with its offerings and classes.**

1. **Delete offering**
   - User
     - Selects offering to be deleted.
     - Clicks "Delete".
   - Site
     - Displays *OfferingList* for current course without deleted offering.
     - Unsets *CurrentOffering*.
       - Hides *ClassList* as side effect.
     - **Deletes offering along with its classes.**

1. **Delete class**
   - User
     - Selects class to be deleted.
     - Clicks "Delete".
   - Site
     - Displays *ClassList* for current offering without deleted class.
     - **Deletes class.**

1. **Edit course name**
   - User
     - Selects class to be edited.
   - Site
     - Sets *CurrentCourse* to course being edited.
     - Turns class name into editable input field.
   - User
     - Edits class name.
     - Submits
   - Site if successful (unique name):
     - Display *CourseList* with course name changed.
     - Leaves *CurrentCourse* set to course being edited.
     - Turns edit box back into plain text.
     - **Persists new course name.**
   - Site if error (duplicate course name):
     - Displays error message.
     - Leaves (incorrect) name in box for editing.
     - Leaves *CurrentCourse* set to course being edited.
