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
    const url = `${this.base}/courses`;
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

  getOfferings(course_id: number) {
    const url = `${this.base}/offerings/${course_id}`;
    return this.getData(url).subscribe(
      (offerings) => {this.store.setOfferingList(offerings)},
      (err) => {this.store.setErrorMessage(err.statusText)}
    );
  }

  addOffering(course_id: number) {
    const url = `${this.base}/offerings/${course_id}`;
    const body = {};
    return this.postData(url, body).subscribe(
      ({course_id, course_name, offering_id, num_classes}) =>
        {this.store.addOffering(course_id, course_name, offering_id, num_classes)},
      (err) => {this.store.setErrorMessage(err.statusText)}
    );
  }

  deleteOffering(offering_id: number) {
    const url = `${this.base}/offerings/${offering_id}`;
    return this.deleteData(url).subscribe(
      (offerings) => {this.store.setOfferingList(offerings)},
      (err) => {this.store.setErrorMessage(err.statusText)}
    );
  }

  getClasses(offering_id: number) {
    const url = `${this.base}/classes/${offering_id}`
    return this.getData(url).subscribe(
      (classes) => {this.store.setClassList(classes)},
      (err) => {this.store.setErrorMessage(err.statusText)}
    );
  }

  addClass(offering_id: number, class_date: string, class_time: string) {
    const url = `${this.base}/classes/${offering_id}`;
    const body = {class_date, class_time};
    return this.postData(url, body).subscribe(
      ({offering_id, class_id, class_date, class_time}) =>
        {this.store.addClass(offering_id, class_id, class_date, class_time)},
      (err) => {this.store.setErrorMessage(err.statustext)}
    );
  }

  deleteClass(class_id: number) {
    const url = `${this.base}/classes/${class_id}`;
    return this.deleteData(url).subscribe(
      (classes) => {this.store.setClassList(classes)},
      (err) => {this.store.setErrorMessage(err.statusText)}
    );
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
