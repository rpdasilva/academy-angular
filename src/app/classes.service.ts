import { Injectable } from '@angular/core';

@Injectable()
export class ClassesService {

  private classes: Object[] = [
    {"course_ident":"BUGS101","course_name":"Writing Bugs for Fun and Profit",
     "offering_ident":3,"class_ident":3,"calendar":"2017-01-04","starting":"09:00"},
    {"course_ident":"BUGS101","course_name":"Writing Bugs for Fun and Profit",
     "offering_ident":3,"class_ident":4,"calendar":"2017-01-04","starting":"14:00"}
  ]

  constructor() { }

  getData(): Object[] {
    return this.classes;
  }

}
