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

  addCourse(courseName: string): Observable<any> {
    const body = {'course_name': courseName};
    return this.http.post(`${this.base}/courses`, body)
      .map(res => ({success: true, payload: res.json()}))
      .catch(err => Observable.of({success: false, payload: 'SERVER ERROR'}));
  }

  getOfferings(courseIdent: number): Observable<any> {
    return this.getData(`${this.base}/offerings/${courseIdent}`);
  }

  addOffering(courseIdent: number, startDate: string, startTime: string): Observable<any> {
    const body = {'course_ident': courseIdent, 'start_date': startDate, 'start_time': startTime};
    return this.http.post(`${this.base}/offerings`, body)
      .map(res => ({success: true, payload: res.json()}))
      .catch(err => Observable.of({success: false, payload: 'SERVER ERROR'}));
  }

  getClasses(offeringIdent: number): Observable<any> {
    return this.getData(`${this.base}/classes/${offeringIdent}`);
  }

}
