import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class OfferingsService {

  constructor(private http: Http) { }

  getData(): Observable<any> {
    return this.http.get('http://localhost:3654/offerings/UX200').map(res => res.json());
  }

}
