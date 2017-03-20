import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

export const NOT_SET = -1;

@Injectable()
export class StoreService {

  currentCourse   = new BehaviorSubject(NOT_SET);
  currentOffering = new BehaviorSubject(NOT_SET);
  currentClass    = new BehaviorSubject(NOT_SET);

  constructor() { }

  setCurrentCourse(ident) {
    this.currentCourse.next(ident);
    this.currentOffering.next(NOT_SET);
    this.currentClass.next(NOT_SET);
  }

  setCurrentOffering(ident) {
    this.currentOffering.next(ident);
    this.currentClass.next(NOT_SET);
  }

  setCurrentClass(ident) {
    this.currentClass.next(ident);
  }

}
