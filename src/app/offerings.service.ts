import { Injectable } from '@angular/core';

@Injectable()
export class OfferingsService {

  private offerings: Object[] = [
    {"course_ident":"UX200","course_name":"Creating Confusing User Interfaces",
     "offering_ident":4,"start_date":"2017-01-03"},
    {"course_ident":"UX200","course_name":"Creating Confusing User Interfaces",
     "offering_ident":5,"start_date":"2017-02-14"}
  ];

  constructor() { }

  getData(): Object[] {
    return this.offerings;
  }

}
