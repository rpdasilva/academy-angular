import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export const NOT_SET = -1;

@Injectable()
export class StoreService {

  _state$ = new BehaviorSubject<any>({
    errorMessage: '',
    courseList: [],
    currentCourseId: NOT_SET,
    currentCourseName: '',
    offeringList: [],
    classList: []
  });

  constructor() { }

  select(selector) {
    return this._state$.map(state => state[selector])
      .distinctUntilChanged();
  }

  updateState(merge) {
    this._state$.take(1).subscribe(state => {
      const newState = Object.assign({}, state, merge);
      this._state$.next(newState);
    });
  }

  setErrorMessage(newMessage) {
    this.updateState({errorMessage: newMessage});
  }

  setCourseList(newCourses) {
    this.updateState({courseList: newCourses});
    this.updateState({errorMessage: ''});
  }

  addCourse(course_id, course_name) {
    const newRecord = {course_id, course_name};

    this.select('courseList').take(1)
      .subscribe(courses => {
        this.updateState({
          courseList: [...courses, newRecord],
          errorMessage: ''
        });
        this.setCurrentCourse(course_id, course_name);
      });
  }

  updateCourse(course_id, course_name) {
    this.select('courseList').take(1)
      .map(courses => courses.map(c => {
        if (c.course_id == course_id) {
          return {course_id, course_name};
        }
        else {
          return c;
        }
      }))
      .subscribe(courses => {
        this.updateState({
          courseList: courses,
          errorMessage: ''
        });
        this.setCurrentCourse(course_id, course_name);
      });
  }

  setCurrentCourse(course_id, course_name) {
    this.updateState({
      currentCourseId: course_id,
      currentCourseName: course_name,
      currentOfferingId: NOT_SET
    });
  }

  setOfferingList(newOfferings) {
    this.updateState({
      offeringList: newOfferings,
      errorMessage: ''
    });
  }

  addOffering(course_id, course_name, offering_id, num_classes) {
    const newRecord = {course_id, course_name, offering_id, num_classes};
    this.select('offeringList').take(1)
      .subscribe(offerings =>
        this.updateState({
          offeringList: [...offerings, newRecord],
          currentOfferingId: offering_id,
          errorMessage: ''
        }));
  }

  setCurrentOfferingId(offering_id) {
    this.updateState({currentOfferingId: offering_id});
  }

  setClassList(newClasses) {
    this.updateState({
      classList: newClasses,
      errorMessage: ''
    });
  }

  addClass(offering_id, class_id, class_date, class_time) {
    const newRecord = {offering_id, class_id, class_date, class_time};
    this.select('classList').take(1)
      .subscribe(classes => {
        this.updateState({
          classList: [...classes, newRecord],
          errorMessage: ''
        });
      });
  }
}
