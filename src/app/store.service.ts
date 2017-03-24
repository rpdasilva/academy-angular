import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export const NOT_SET = -1;

@Injectable()
export class StoreService {

  errorMessage      = new BehaviorSubject('');
  courseList        = new BehaviorSubject([]);
  currentCourseId   = new BehaviorSubject(NOT_SET);
  currentCourseName = new BehaviorSubject('');
  offeringList      = new BehaviorSubject([]);
  currentOfferingId = new BehaviorSubject(NOT_SET);

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
    this.setCurrentCourse(course_id, course_name);
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
    this.setCurrentCourse(course_id, course_name);
    this.errorMessage.next('');
  }

  setCurrentCourse(course_id, course_name) {
    this.currentCourseId.next(course_id);
    this.currentCourseName.next(course_name);
    this.currentOfferingId.next(NOT_SET);
  }

  setOfferingList(newOfferings) {
    this.offeringList.next(newOfferings);
    this.errorMessage.next('');
  }

  addOffering(course_id, course_name, offering_id, num_classes) {
    this.offeringList.take(1)
      .subscribe(offerings =>
		 this.offeringList.next([...offerings,
					 {course_id, course_name, offering_id, num_classes}]));
    this.setCurrentOfferingId(offering_id);
    this.errorMessage.next('');
  }

  setCurrentOfferingId(offering_id) {
    this.currentOfferingId.next(offering_id);
  }
}
