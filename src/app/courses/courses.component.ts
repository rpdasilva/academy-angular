import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  // Test data.
  courses: Object[] = [
    {"course_ident":"BUGS101","course_name":"Writing Bugs for Fun and Profit"},
    {"course_ident":"UX200","course_name":"Creating Confusing User Interfaces"}
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
