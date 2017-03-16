import { Injectable } from '@angular/core';

@Injectable()
export class CoursesService {

  private courses: Object[] = [
    {"course_ident":"BUGS101","course_name":"Writing Bugs for Fun and Profit"},
    {"course_ident":"UX200","course_name":"Creating Confusing User Interfaces"}
  ];

  
  getData(): Object[] {
    console.log('CoursesService.getData');
    return this.courses;
  }

  constructor() { }

}
