import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { StoreService } from '../store/store.service';
import { NOT_SET, Course } from '../store/store.types';
import { Store } from '@ngrx/store';
import { AppState } from '../store/store.types';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Course[] = [];
  currentCourseId: number = NOT_SET;

  constructor(
    private backend: BackendService,
    private store: Store<AppState>
  ) {
  }

  ngOnInit() {
    this.store.select('courseList')
      .subscribe((courses: Course[]) => this.courses = courses);

    this.store.select('currentCourseId')
      .subscribe((currentCourseId: number) => this.currentCourseId = currentCourseId);

    this.store.subscribe(console.log);

    this.backend.getCourses();
  }

  onSelectCourse(rec) {
    this.backend.getOfferings(rec.courseId);
    // this.store.setCurrentCourse(rec.courseId, rec.courseName);
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
