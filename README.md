# Courses

Very simple course manager built for learning JavaScript, Node, and Angular.

This project was generated with
[angular-cli](https://github.com/angular/angular-cli) version
1.0.0-beta.28.3.

## Development server

Run `ng serve` for a dev server. Navigate to
`http://localhost:4200/`. The app will automatically reload if you
change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new
component. You can also use `ng generate
directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be
stored in the `dist/` directory. Use the `-prod` flag for a production
build.

## Running unit tests

Run `ng test` to execute the unit tests via
[Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via
[Protractor](http://www.protractortest.org/).  Before running the
tests make sure you are serving the app via `ng serve`.

## Deploying to GitHub Pages

Run `ng github-pages:deploy` to deploy to GitHub Pages.

## Further help

To get more help on the `angular-cli` use `ng help` or go check out
the [Angular-CLI
README](https://github.com/angular/angular-cli/blob/master/README.md).

## Steps taken

1.  Use `angular-cli` to create initial project.

1.  Modify `.gitignore` to ignore `node_modules` and Emacs backup
    files.

1.  Create `server` directory and write `init.sql` to store database
    of courses and offerings; update `.gitignore` to ignore
    `server/academy.db`.

1.  Install packages needed by Express (see header of
    `server/index.js` for list).

1.  Write `server/index.js` to return JSON for:
    1.  a list of courses at `/courses`
    1.  offerings for a particular course at `/course/NNN`

1.  Modify `.gitignore` to ignore `*.log`.

1.  Copy JSON data for all courses into `AppComponent` in
    `src/app/app.component.ts` and update `src/app/app.component.html`
    to display the number of courses.  (Will refer to `src/app` as `@`
    from now on for brevity.)

1.  Modify `app.component.html` to display courses in a table.

1.  Use Bootstrap for styling.

1.  Create a separate component in `@/app.component.*` to display
    courses.

1.  Use `ng generate component courses` to create a component to
    display course data; move fixed test data and HTML from main app
    to `@/courses/courses.component.*`.

1.  Use `ng generate component offerings` to create a component to
    display offerings for a particular course; add code to
    `@/offerings/offerings.component.*` similar to that used for
    courses.  Offerings for a fixed course are displayed directly
    from `@/app.component.*`.

1.  Fetch actual data for courses from server:
    1.  Add CORS to `server/index.js` to allow HTTP requests
        (see <https://github.com/rangle/hub/wiki/CORS>).
    1.  Add HTTP service to application.
    1.  Inject HTTP server into `CoursesComponent`.
    1.  Add `CoursesComponent.getData` method to fetch data.
    1.  Add call to `getData` to `CoursesComponent.ngOnInit`
        to receive data and store in member variable for display.

1.  Refactor to create a data fetching service:
    1.  Use `ng generate service data-fetcher` to create service.
    1.  Manually add this service to `providers` in `app.module.ts`.
    1.  Inject service into constructor of `CourseComponent`.
    1.  Call service with `/courses` as URL.

1.  Modify `OfferingComponent` to use data fetching service with fixed
    URL.

1.  Make course identifiers selectable:
    1.  Add `CourseComponent.onSelectCourse` method to log clicks on
        course identifiers.
    1.  Add `(click)="onSelectCourse(rec)"` to HTML for each row.
    1.  Log click events to console.

1.  Create a store service to store current state of application as a
    set of observables.
    1.  Use `ng generate service store` to create the service.
    1.  Manually add to `app.module`.
    1.  Add `currentCourse` and `currentOffering` members of type
        `BehaviorSubject` with initial value `NOT_SET`.
    1.  Add `setCurrentCourse` method to set the current course
        and un-set the current offering.
    1.  Add `setCurrentOffering` method to set the current offering.
    1.  Inject `StoreService` into `CourseComponent` via constructor.
    1.  Modify `CourseComponent.onSelectCourse` to call
        `StoreService.setCurrentCourse`.

1.  Update `OfferingComponent` to reflect current course:
    1.  Add `courseName` and `visible` member variables.
    1.  Inject `StoreService` via constructor.
    1.  Subscribe to `store.currentCourse`:
        1.  When `NOT_SET`, make `OfferingComponent` invisible and
            clear `courseName` and `offerings`.
        1.  When set, make make `OfferingComponent` visible, fetch
            data for that course's offerings, and update `courseName`
            and `offerings`.

1.  Do it all again to show classes for a particular offering:
    1.  Use `ng generate` to create a `ClassComponent`.
    1.  Have it fetch data in `ngOnInit` for a particular offering.
    1.  Display that data as a table.
    1.  Inject the data fetching service.
    1.  Have `ClassComponent` fetch data for a particular offering.
    1.  Inject the store service and make `ClassComponent` subscribe
        to `StoreService.currentOffering`.
    1.  Replicate the show/hide logic used in `OfferingComponent`.

1.  Modify `server/index.js` to accept POST requests with new courses.
    1.  Enforce uniqueness constraint on course names.
    1.  Fetch just-added course by name to return its ID.
    1.  Let server handle errors as it normally would.

1.  Rename data fetching service to `Backend` because it is now going
    to be used for pushing as well as pulling.
    1.  `angular-cli` doesn't have "rename" functionality, so this
        involves a lot of searching, replacing, recompiling, and
	swearing.

1.  Refactor `Backend` so that URLs are generated internally rather
    than being passed in.

1.  Add a `catch` in the POSTing method of `Backend` to handle error
    return values.
    *   This must convert its input to an Observable so that callers
        of the method always get an Observable: returning the array
	directly leads to weird casting behavior (an observable that
	serves the array items one by one).

1.  Add an element to `courses.template.html` to display error messages
    if they are present, and logic to set and clear an `errorMessage`
    variable in `CoursesComponent` on every action.

1.  Refactor to remove explicit `visible` property on offerings and
    classes and use `isVisible` method that compares course and
    offering identifiers to `NOT_SET`.

1.  Add and test function in server to add new offering.
