import { AppState, NOT_SET } from './store.types';

export const INITIAL_STATE: AppState = {
  errorMessage: '',
  courseList: [], // [{courseId, courseName}, ...]
  offeringList: [], // [{offeringId, numClasses}, ...]
  classList: [], // [{classId, classDate, classTime}, ...]
  currentCourseId: NOT_SET,
  currentCourseName: '',
  currentOfferingId: NOT_SET
};