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
  errorMessage: string = '';
  newCourseName: string = '';

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
    this.store.setCurrentCourse(rec.course_id);
    this.errorMessage = '';
  }

  onNewCourse(name) {
    this.backend.addCourse(name).subscribe(
      ({success, payload}) => {
	if (success) {
          this.courses = [...this.courses, payload];
	  this.errorMessage = '';
	}
	else {
	  this.errorMessage = payload;
	}
      });
  }

  onEditName(rec, name) {
    console.log('editing name of', rec, 'with new name', name);
    this.backend.updateCourse(rec.course_id, name).subscribe(
      ({success, payload}) => {
	if (success) {
	  rec.course_name = name;
	  this.errorMessage = '';
	}
	else {
	  this.errorMessage = payload;
	}
      });
  }

  onDeleteCourse(rec) {
    this.backend.deleteCourse(rec.course_id).subscribe(
      ({success, payload}) => {
        if (success) {
          this.courses = payload;
          this.errorMessage = '';
        }
        else {
          this.errorMessage = payload;
        }
      });
  }

}
