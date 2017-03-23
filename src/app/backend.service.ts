import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class BackendService {

  private base = 'http://localhost:3654';

  constructor(private http: Http) { }

  getCourses(): Observable<any> {
    return this.getData(`${this.base}/courses`);
  }

  addCourse(course_name: string): Observable<any> {
    return this.postData(
      `${this.base}/courses/add`,
      {course_name});
  }

  updateCourse(course_id: number, course_name: string): Observable<any> {
    return this.postData(
      `${this.base}/courses/update/${course_id}`,
      {course_name});
  }

  deleteCourse(course_id: number): Observable<any> {
    return this.deleteData(`${this.base}/courses/${course_id}`);
  }

  getOfferings(course_id: number): Observable<any> {
    return this.getData(`${this.base}/offerings/${course_id}`);
  }

  addOffering(course_id: number, start_date: string, start_time: string): Observable<any> {
    return this.postData(
      `${this.base}/offerings/${course_id}`,
      {start_date, start_time});
  }

  deleteOffering(offering_id: number): Observable<any> {
    return this.deleteData(`${this.base}/offerings/${offering_id}`);
  }

  getClasses(offering_id: number): Observable<any> {
    return this.getData(`${this.base}/classes/${offering_id}`);
  }

  addClass(offering_id: number, class_date: string, class_time: string): Observable<any> {
    return this.postData(
      `${this.base}/classes/${offering_id}`,
      {class_date, class_time});
  }

  deleteClass(class_id: number): Observable<any> {
    return this.deleteData(`${this.base}/classes/${class_id}`);
  }

  private getData(url: string): Observable<any> {
    return this.http.get(url).map(res => res.json());
  }

  private postData(url: string, body: Object) {
    return this.http.post(url, body)
      .map(res => this.standardSuccess(res))
      .catch(err => Observable.of(this.standardError(err)));
  }

  private deleteData(url: string) {
    return this.http.delete(url)
      .map(res => this.standardSuccess(res))
      .catch(err => Observable.of(this.standardError(err)));
  }

  private standardSuccess(res: any) {
    return {success: true, payload: res.json()};
  }

  private standardError(res: any) {
    return {success: false, payload: 'SERVER ERROR'};
  }

}
