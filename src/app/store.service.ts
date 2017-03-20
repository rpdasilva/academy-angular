import { Injectable } from '@angular/core';

@Injectable()
export class StoreService {

  currentCourse: number = -1;
  currentOffering: number = -1;
  currentClass: number = -1;

  constructor() { }

}
