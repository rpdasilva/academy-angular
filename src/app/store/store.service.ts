import { BehaviorSubject, Observable, Subject } from 'rxjs';
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
  currentOfferingId: NOT_SET,
  classList: []
};

export const actions = {
  SET_COURSES: 'SET_COURSES',
  ADD_COURSE: 'ADD_COURSE',
  UPDATE_COURSE: 'UPDATE_COURSE',
  SET_CURRENT_COURSE: 'SET_CURRENT_COURSE',
  UPDATE_STATE: 'UPDATE_STATE'
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

  private _actions$ = new Subject<Action>();
  private _state$: Observable<any>;

  constructor() {
    this._state$ = this._actions$.scan((state, action) => {
      return this.stateReducer(state, action);
    }, INITIAL_STATE);
  }

  dispatch(action: Action) {
    this._actions$.next(action);
  }

  select(selector) {
    return this._state$.map(state => state[selector])
      .distinctUntilChanged();
  }

  updateState(merge) {
    this.dispatch({ type: actions.UPDATE_STATE, payload: merge });
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

      case actions.UPDATE_STATE:
        return Object.assign({}, state, action.payload);

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
