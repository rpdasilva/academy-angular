import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class BackendService {

  private base = 'http://localhost:3654';

  constructor(private http: Http) { }

  private getData(url: string): Observable<any> {
    return this.http.get(url).map(res => res.json());
  }

  getCourses(): Observable<any> {
    return this.getData(`${this.base}/courses`);
  }

  addCourse(course_name: string): Observable<any> {
    const body = {
      course_name
    };
    return this.http.post(`${this.base}/courses`, body)
      .map(res => ({success: true, payload: res.json()}))
      .catch(err => Observable.of({success: false, payload: 'SERVER ERROR'}));
  }

  deleteCourse(course_id: number): Observable<any> {
    return this.http.delete(`${this.base}/courses/${course_id}`)
      .map(res => ({success: true, payload: res.json()}))
      .catch(err => Observable.of({success: false, payload: 'SERVER ERROR'}));
  }

  getOfferings(course_id: number): Observable<any> {
    return this.getData(`${this.base}/offerings/${course_id}`);
  }

  addOffering(course_id: number, start_date: string, start_time: string): Observable<any> {
    const body = {
      start_date,
      start_time
    };
    return this.http.post(`${this.base}/offerings/${course_id}`, body)
      .map(res => ({success: true, payload: res.json()}))
      .catch(err => Observable.of({success: false, payload: 'SERVER ERROR'}));
  }

  getClasses(offering_id: number): Observable<any> {
    return this.getData(`${this.base}/classes/${offering_id}`);
  }

  addClass(offering_id: number, class_date: string, class_time: string): Observable<any> {
    const body = {
      class_date,
      class_time
    };
    return this.http.post(`${this.base}/classes/${offering_id}`, body)
      .map(res => ({success: true, payload: res.json()}))
      .catch(err => Observable.of({success: false, payload: 'SERVER ERROR'}));
  }

}
