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
  currentCourseId: number = NOT_SET;

  constructor(
    private backend: BackendService,
    private store: StoreService
  ) {
  }

  ngOnInit() {
    this.store.select('courseList').subscribe(
      courses => {this.courses = courses;});
    this.store.select('currentCourseId').subscribe(
      currentCourseId => {this.currentCourseId = currentCourseId;});
    this.backend.getCourses();
  }

  onSelectCourse(rec) {
    this.backend.getOfferings(rec.courseId);
    this.store.setCurrentCourse(rec.courseId, rec.courseName);
  }

  onNewCourse(name) {
    this.backend.addCourse(name);
  }

  onEditName(rec, name) {
    this.backend.changeCourseName(rec.courseId, name);
  }

  onDeleteCourse(rec) {
    this.backend.deleteCourse(rec.courseId);
  }

}
