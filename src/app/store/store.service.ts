import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Action, AppState, NOT_SET } from './store.types';
import { INITIAL_STATE } from './store.initial-state';

const ACTIONS: any = {};

@Injectable()
export class StoreService {

  private _action$ = new Subject();
  private _state$: Observable<any>;

  constructor() {
    this._state$ = this._action$.scan(() => INITIAL_STATE, INITIAL_STATE);
  }

  dispatch(action: Action) {
    this._action$.next(action);
  }

  select(selector) {
    return this._state$.map(state => state[selector])
      .distinctUntilChanged();
  }

  setErrorMessage(errorMessage) {
    this.dispatch({type: ACTIONS.ERROR_MESSAGE,
                   payload: {errorMessage}});
  }

  setCourseList(courseList) {
    this.dispatch({type: ACTIONS.COURSE_SET_ALL,
                   payload: {courseList}});
  }

  addCourse(courseId, courseName) {
    this.dispatch({type: ACTIONS.COURSE_ADD,
                   payload: {courseId, courseName}});
  }

  updateCourse(courseId, courseName) {
    this.dispatch({type: ACTIONS.COURSE_UPDATE,
                   payload: {courseId, courseName}});
  }

  setCurrentCourse(courseId, courseName) {
    this.dispatch({type: ACTIONS.COURSE_SET_CURRENT,
                   payload: {courseId, courseName}});
  }

  setOfferingList(offeringList) {
    this.dispatch({type: ACTIONS.OFFERING_SET_ALL,
                   payload: {offeringList}});
  }

  addOffering(courseId, courseName, offeringId, numClasses) {
    this.dispatch({type: ACTIONS.OFFERING_ADD,
                   payload: {courseId, courseName, offeringId, numClasses}});
  }

  setCurrentOfferingId(offeringId) {
    this.dispatch({type: ACTIONS.OFFERING_SET_CURRENT,
                   payload: {offeringId}});
  }

  setClassList(classList) {
    this.dispatch({type: ACTIONS.CLASS_SET_ALL,
                   payload: {classList}});
  }

  addClass(offeringId, classId, classDate, classTime) {
    this.dispatch({type: ACTIONS.CLASS_ADD,
                   payload: {offeringId, classId, classDate, classTime}});
  }
}
