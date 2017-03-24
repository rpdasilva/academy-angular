import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { StoreService} from './store.service';

@Injectable()
export class BackendService {

  private base = 'http://localhost:3654';

  constructor(
    private http: Http,
    private store: StoreService
  ) {
  }

  getCourses() {
    const url = `${this.base}/courses`;
    this.getData(url).subscribe(
      (courses) => {this.store.setCourseList(courses)},
      (err) => {this.store.setErrorMessage(err.statusText)}
    );
  }

  addCourse(course_name: string) {
    const url = `${this.base}/courses/add`;
    const body = {course_name};
    this.postData(url, body).subscribe(
      ({course_id, course_name}) => {this.store.addCourse(course_id, course_name)},
      (err) => {this.store.setErrorMessage(err.statusText)}
    );
  }

  changeCourseName(course_id: number, course_name: string) {
    const url = `${this.base}/courses/update/${course_id}`;
    const body = {course_name};
    this.postData(url, body).subscribe(
      ({course_id, course_name}) => {this.store.updateCourse(course_id, course_name)},
      (err) => {this.store.setErrorMessage(err.statusText)}
    );
  }

  deleteCourse(course_id: number) {
    const url = `${this.base}/courses/${course_id}`;
    this.deleteData(url).subscribe(
      (courses) => {this.store.setCourseList(courses)},
      (err) => {this.store.setErrorMessage(err.statusText)}
    );
  }

  getOfferings(course_id: number): Observable<any> {
    return this.getData(`${this.base}/offerings/${course_id}`);
  }

  addOffering(course_id: number): Observable<any> {
    return this.postData(
      `${this.base}/offerings/${course_id}`,
      {});
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

  private postData(url: string, body: Object): Observable<any> {
    return this.http.post(url, body).map(res => res.json());
  }

  private deleteData(url: string): Observable<any> {
    return this.http.delete(url).map(res => res.json());
  }
}
