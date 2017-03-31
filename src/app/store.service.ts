import { Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export const NOT_SET = -1;

interface Action {
  type: string;
  payload?: any;
}

const INITIAL_STATE = {
  errorMessage: '',
  courseList: [], // [{courseId, courseName}, ...]
  offeringList: [], // [{offeringId, numClasses}, ...]
  classList: [], // [{classId, classDate, classTime}, ...]
  currentCourseId: NOT_SET,
  currentCourseName: '',
  currentOfferingId: NOT_SET
}

const ACTIONS = {
  ERROR_MESSAGE: 'ERROR_MESSAGE',
  COURSE_ADD: 'COURSE_ADD',
  COURSE_SET_ALL: 'COURSE_SET_ALL',
  COURSE_SET_CURRENT: 'COURSE_SET_CURRENT',
  COURSE_UPDATE: 'COURSE_UPDATE',
  OFFERING_SET_ALL: 'OFFERING_SET_ALL',
  OFFERING_ADD: 'OFFERING_ADD',
  OFFERING_SET_CURRENT: 'OFFERING_SET_CURRENT',
  CLASS_SET_ALL: 'CLASS_SET_ALL',
  CLASS_ADD: 'CLASS_ADD'
};

function stateReducer(action, state) {
  switch(action.type){

  case ACTIONS.ERROR_MESSAGE: {
    const {errorMessage} = action.payload;
    const update = {
      errorMessage: errorMessage
    };
    return Object.assign({}, state, update);
  }

  case ACTIONS.COURSE_ADD: {
    const {courseId, courseName} = action.payload;
    const update = {
      errorMessage: '',
      courseList: [...state.courseList, {courseId, courseName}],
      currentCourseId: NOT_SET,
      currentCourseName: '',
      offeringList: [],
      currentOfferingId: NOT_SET,
      classList: []
    };
    return Object.assign({}, state, update);
  }

  case ACTIONS.COURSE_SET_ALL: {
    const {courseList} = action.payload;
    const update = {
      errorMessage: '',
      courseList: courseList,
      currentCourseId: NOT_SET,
      currentCourseName: '',
      offeringList: [],
      currentOfferingId: NOT_SET,
      classList: []
    };
    return Object.assign({}, state, update);
  }

  case ACTIONS.COURSE_SET_CURRENT: {
    const {courseId, courseName} = action.payload;
    const update = {
      errorMessage: '',
      currentCourseId: courseId,
      currentCourseName: courseName
    };
    return Object.assign({}, state, update);
  }
      
  case ACTIONS.COURSE_UPDATE: {
    const {courseId, courseName} = action.payload;
    const update = {
      errorMessage: '',
      courseList: state.courseList.map(c => {
        return (c.courseId == courseId) ? {courseId, courseName} : c;
      }),
      currentCourseId: NOT_SET,
      currentCourseName: '',
      offeringList: [],
      currentOfferingId: NOT_SET,
      classList: []
    };
    return Object.assign({}, state, update);
  }

  case ACTIONS.OFFERING_ADD: {
    const {courseId, courseName, offeringId, numClasses} = action.payload;
    const update = {
      errorMessage: '',
      offeringList: [...state.offeringList, {offeringId, numClasses}],
      currentOfferingId: NOT_SET,
      classList: []
    };
    return Object.assign({}, state, update);
  }

  case ACTIONS.OFFERING_SET_ALL: {
    const {offeringList} = action.payload;
    const update = {
      errorMessage: '',
      offeringList: offeringList,
      currentOfferingId: NOT_SET,
      classList: []
    };
    return Object.assign({}, state, update);
  }

  case ACTIONS.OFFERING_SET_CURRENT: {
    const {offeringId} = action.payload;
    const update = {
      errorMessage: '',
      currentOfferingId: offeringId
    };
    return Object.assign({}, state, update);
  }

  case ACTIONS.CLASS_SET_ALL: {
    const {classList} = action.payload;
    const update = {
      classList: classList,
      errorMessage: ''
    };
    return Object.assign({}, state, update);
  }

  case ACTIONS.CLASS_ADD: {
    const {offeringId, classId, classDate, classTime} = action.payload;
    const update = {
      errorMessage: '',
      classList: [...state.classList, {classId, classDate, classTime}]
    };
    return Object.assign({}, state, update);
  }

  default:
    return state;
  }
}

@Injectable()
export class StoreService {

  _action$ = new Subject();
  _state$ = new BehaviorSubject<any>({
    errorMessage: '',
    courseList: [],
    currentCourseId: NOT_SET,
    currentCourseName: '',
    offeringList: [],
    currentOfferingId: NOT_SET,
    classList: []
  });

  constructor() {
    this._action$
      .withLatestFrom(this._state$)
      .subscribe(([action, state]) => {
        const newState = stateReducer(action, state);
        this._state$.next(newState);
    });
  }

  dispatch(action: Action) {
    this._action$.next(action);
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
