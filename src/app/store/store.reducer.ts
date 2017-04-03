import { Action, AppState, NOT_SET } from './store.types';
import { INITIAL_STATE } from './store.initial-state';

export const ACTIONS = {
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

export function rootReducer(state: AppState = INITIAL_STATE, action: Action): AppState {
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