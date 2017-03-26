import { Injectable } from '@angular/core';
import { StoreService, actions } from '../store/store.service';

@Injectable()
export class CoursesActionsService {

  constructor(private store: StoreService) { }

  setCourses(courses) {
    this.store.dispatch({
      type: actions.SET_COURSES,
      payload: {
        courseList: courses
      }
    });
  }

  addCourse(course_id, course_name) {
    this.store.dispatch({
      type: actions.SET_COURSES,
      payload: {
        course_id,
        course_name
      }
    });
  }

  updateCourse(course_id, course_name) {
    this.store.dispatch({
      type: actions.UPDATE_COURSE,
      payload: {
        course_id,
        course_name
      }
    });
  }

  setCurrentCourse(course_id, course_name) {
    this.store.dispatch({
      type: actions.SET_CURRENT_COURSE,
      payload: {
        course_id,
        course_name
      }
    });
  }
}
