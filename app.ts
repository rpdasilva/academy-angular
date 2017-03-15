// Imports.
import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

// Root component of entire page.
@Component({
    selector: 'app-component',
    template: `
<div id="courses">
  <h2>{{courses.length}} Courses</h2>
  <app-course *ngFor="let c of courses">
    <p>course_ident: {{c.course_ident}}</p>
    <p>course_name: {{c.course_name}}</p>
  </app-course>
</div>
    `
})
export class AppComponent {

    // Test data.
    courses: Object[] = [
	{"course_ident": 1,
	 "course_name": "Bugs"},
	{"course_ident": 2,
	 "course_name": "Confusion"}
    ];
}

// Boilerplate to get application running.
@NgModule({
    imports: [BrowserModule],
    declarations: [AppComponent],
    providers: [],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
