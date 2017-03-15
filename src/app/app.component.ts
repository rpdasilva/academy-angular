import { Component } from '@angular/core';

// Root component of entire page.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
