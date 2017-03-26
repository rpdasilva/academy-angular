import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export const NOT_SET = -1;

export interface Action {
  type: string;
  payload?: any;
  error?: boolean;
  meta?: any;
}

export const INITIAL_STATE = {
  errorMessage: '',
  courseList: [],
  currentCourseId: NOT_SET,
  currentCourseName: '',
  offeringList: [],
  classList: []
};

export const actions = {
  SET_COURSES: 'SET_COURSES',
  ADD_COURSE: 'ADD_COURSE',
  UPDATE_COURSE: 'UPDATE_COURSE',
  SET_CURRENT_COURSE: 'SET_CURRENT_COURSE'
};

function replaceInList(list, replacement, key) {
  return list.map(item => {
    if (item[key] == replacement[key]) {
      return replacement;
    }
    else {
      return item;
    }
  });
}

@Injectable()
export class StoreService {

  _actions$ = new Subject<Action>();
  _state$ = new BehaviorSubject<any>(INITIAL_STATE);

  constructor() {
    this._actions$.withLatestFrom(this._state$)
      .subscribe(([action, state]) => {
        const newState = this.stateReducer(state, action);
        this._state$.next(newState);
      });
  }

  dispatch(action: Action) {
    this._actions$.next(action);
  }

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

  stateReducer(state, action: Action) {
    switch(action.type) {
      case actions.SET_COURSES:
        var {courseList} = action.payload;
        return Object.assign({}, state, {
          courseList,
          errorMessage: ''
        });

      case actions.ADD_COURSE:
        var {course_id, course_name} = action.payload;
        var newCourse = {course_id, course_name};
        return Object.assign({}, state, {
          courseList: [...state.courseList, newCourse],
          currentCourseId: course_id,
          currentCourseName: course_name,
          currentOfferingId: NOT_SET,
          errorMessage: ''
        });

      case actions.UPDATE_COURSE:
        var {course_id, course_name} = action.payload;
        var newCourse = {course_id, course_name};
        var courseList =
          replaceInList(state.courseList, newCourse, 'course_id');
        return Object.assign({}, state, {
          courseList,
          currentCourseId: course_id,
          currentCourseName: course_name,
          currentOfferingId: NOT_SET,
          errorMessage: ''
        });

      case actions.SET_CURRENT_COURSE:
        var {course_id, course_name} = action.payload;
        return Object.assign({}, state, {
          currentCourseId: course_id,
          currentCourseName: course_name,
          currentOfferingId: NOT_SET
        });

      default:
        return state;
    }
  }

  setErrorMessage(newMessage) {
    this.updateState({errorMessage: newMessage});
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
