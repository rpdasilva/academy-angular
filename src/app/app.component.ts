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

  offerings: Object[] = [
    {"course_ident":"UX200","course_name":"Creating Confusing User Interfaces",
     "offering_ident":4,"start_date":"2017-01-03"},
    {"course_ident":"UX200","course_name":"Creating Confusing User Interfaces",
     "offering_ident":5,"start_date":"2017-02-14"}
  ];

  classes: Object[] = [
    {"course_ident":"BUGS101","course_name":"Writing Bugs for Fun and Profit",
     "offering_ident":3,"class_ident":3,"calendar":"2017-01-04","starting":"09:00"},
    {"course_ident":"BUGS101","course_name":"Writing Bugs for Fun and Profit",
     "offering_ident":3,"class_ident":4,"calendar":"2017-01-04","starting":"14:00"}
  ]
}
