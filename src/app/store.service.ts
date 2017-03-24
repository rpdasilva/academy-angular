import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export const NOT_SET = -1;

@Injectable()
export class StoreService {

  errorMessage    = new BehaviorSubject('');
  courseList      = new BehaviorSubject([]);
  currentCourseId = new BehaviorSubject(NOT_SET);
  currentOffering = new BehaviorSubject(NOT_SET);

  constructor() { }

  setErrorMessage(newMessage) {
    this.errorMessage.next(newMessage);
  }

  setCourseList(newCourses) {
    this.courseList.next(newCourses);
    this.errorMessage.next('');
  }

  addCourse(course_id, course_name) {
    this.courseList.take(1)
      .subscribe(courses =>
		 this.courseList.next([...courses,
				       {course_id, course_name}]));
    this.setCurrentCourseId(course_id);
    this.errorMessage.next('');
  }

  updateCourse(course_id, course_name) {
    this.courseList.take(1)
      .map(courses => courses.map(c => {
	if (c.course_id == course_id) {
	  return {course_id, course_name};
	}
	else {
	  return c;
	}
      }))
      .subscribe(courses => this.courseList.next(courses));
    this.setCurrentCourseId(course_id);
    this.errorMessage.next('');
  }

  setCurrentCourseId(course_id) {
    this.currentCourseId.next(course_id);
    this.currentOffering.next(NOT_SET);
  }

  setCurrentOffering(offering_id) {
    this.currentOffering.next(offering_id);
  }
}
