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
    {"course_ident":"BUGS101","course_name":"Writing Bugs for Fun and Profit"},
    {"course_ident":"UX200","course_name":"Creating Confusing User Interfaces"}
  ];
}
