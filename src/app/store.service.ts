import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export const NOT_SET = -1;

@Injectable()
export class StoreService {

  currentCourse   = new BehaviorSubject(NOT_SET);
  currentOffering = new BehaviorSubject(NOT_SET);
  currentClass    = new BehaviorSubject(NOT_SET);

  constructor() { }

  setCurrentCourse(course_id) {
    this.currentCourse.next(course_id);
    this.currentOffering.next(NOT_SET);
    this.currentClass.next(NOT_SET);
  }

  setCurrentOffering(offering_id) {
    this.currentOffering.next(offering_id);
    this.currentClass.next(NOT_SET);
  }

  setCurrentClass(class_id) {
    this.currentClass.next(class_id);
  }

}
