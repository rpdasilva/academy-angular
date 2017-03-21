import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class BackendService {

  constructor(private http: Http) { }

  getData(url: string): Observable<any> {
    return this.http.get(url).map(res => res.json());
  }

}
