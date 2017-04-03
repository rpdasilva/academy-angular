import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { StoreService} from './store/store.service';

export class ActionObservable extends Observable<any> {
  ofType(actionType: string) {
    return this.filter((action) => action.type === actionType);
  }
}

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

  addCourse(courseName: string) {
    const url = `${this.base}/courses`;
    const body = {courseName};
    this.postData(url, body).subscribe(
      ({courseId, courseName}) => {this.store.addCourse(courseId, courseName)},
      (err) => {this.store.setErrorMessage(err.statusText)}
    );
  }

  changeCourseName(courseId: number, courseName: string) {
    const url = `${this.base}/courses/update/${courseId}`;
    const body = {courseName};
    this.putData(url, body).subscribe(
      ({courseId, courseName}) => {this.store.updateCourse(courseId, courseName)},
      (err) => {this.store.setErrorMessage(err.statusText)}
    );
  }

  deleteCourse(courseId: number) {
    const url = `${this.base}/courses/${courseId}`;
    this.deleteData(url).subscribe(
      (courses) => {this.store.setCourseList(courses)},
      (err) => {this.store.setErrorMessage(err.statusText)}
    );
  }

  getOfferings(courseId: number) {
    const url = `${this.base}/offerings/${courseId}`;
    return this.getData(url).subscribe(
      (offerings) => {this.store.setOfferingList(offerings)},
      (err) => {this.store.setErrorMessage(err.statusText)}
    );
  }

  addOffering(courseId: number) {
    const url = `${this.base}/offerings/${courseId}`;
    const body = {};
    return this.postData(url, body).subscribe(
      ({courseId, courseName, offeringId, numClasses}) =>
        {this.store.addOffering(courseId, courseName, offeringId, numClasses)},
      (err) => {this.store.setErrorMessage(err.statusText)}
    );
  }

  deleteOffering(offeringId: number) {
    const url = `${this.base}/offerings/${offeringId}`;
    return this.deleteData(url).subscribe(
      (offerings) => {this.store.setOfferingList(offerings)},
      (err) => {this.store.setErrorMessage(err.statusText)}
    );
  }

  getClasses(offeringId: number) {
    const url = `${this.base}/classes/${offeringId}`
    return this.getData(url).subscribe(
      (classes) => {this.store.setClassList(classes)},
      (err) => {this.store.setErrorMessage(err.statusText)}
    );
  }

  addClass(offeringId: number, classDate: string, classTime: string) {
    const url = `${this.base}/classes/${offeringId}`;
    const body = {classDate, classTime};
    return this.postData(url, body).subscribe(
      ({offeringId, classId, classDate, classTime}) =>
        {this.store.addClass(offeringId, classId, classDate, classTime)},
      (err) => {this.store.setErrorMessage(err.statustext)}
    );
  }

  deleteClass(classId: number) {
    const url = `${this.base}/classes/${classId}`;
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

  private putData(url: string, body: Object): Observable<any> {
    return this.http.put(url, body).map(res => res.json());
  }

  private deleteData(url: string): Observable<any> {
    return this.http.delete(url).map(res => res.json());
  }
}
