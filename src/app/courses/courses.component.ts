import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Object[] = [];

  constructor(private coursesService: CoursesService) {
  }

  ngOnInit() {
    this.coursesService.getData().subscribe(
      body => {this.courses = body;});
  }

}
