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
  newCourseName: string = '';

  constructor(
    private backend: BackendService,
    private store: StoreService
  ) {
  }

  ngOnInit() {
    this.store.courseList.subscribe(
      newCourses => {this.courses = newCourses;});
    this.backend.getCourses();
  }

  onSelectCourse(rec) {
    this.store.setCurrentCourse(rec.course_id);
  }

  onNewCourse(name) {
    this.backend.addCourse(name);
  }

  onEditName(rec, name) {
    this.backend.changeCourseName(rec.course_id, name);
  }

  onDeleteCourse(rec) {
    this.backend.deleteCourse(rec.course_id);
  }

}
