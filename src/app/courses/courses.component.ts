import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { StoreService, NOT_SET } from '../store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Object[] = [];
  newCourseName: string;

  constructor(
    private backend: BackendService,
    private store: StoreService
  ) {
  }

  ngOnInit() {
    this.backend.getCourses().subscribe(
      body => {this.courses = body;});
  }

  onSelectCourse(rec) {
    this.store.setCurrentCourse(rec.course_ident);
  }

  onNewCourse(name) {
    this.backend.addCourse(name).subscribe(
      ({success, payload}) => {
        success ?
          this.courses = [...this.courses, payload] :
          console.log('Handle error', payload);
      });
  }

}
