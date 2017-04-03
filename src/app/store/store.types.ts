export const NOT_SET = -1;

export interface Action {
  type: string;
  payload?: any;
}

export interface Course {
  courseId: number;
  courseName: string;
}

export interface Offering {
  courseId: number;
  courseName: string;
  numClasses: number;
  offeringId: number;
}

export interface Class {
  classDate: string;
  classId: number;
  classTime: string;
  courseId: number;
  courseName: string;
  offeringId: number;
}

export interface AppState {
  errorMessage: string;
  courseList: Course[];
  offeringList: Offering[];
  classList: Class[];
  currentCourseId: number;
  currentCourseName: string;
  currentOfferingId: number;
}