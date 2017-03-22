import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { StoreService, NOT_SET } from '../store.service';

@Component({
  selector: 'app-offerings',
  templateUrl: './offerings.component.html',
  styleUrls: ['./offerings.component.css']
})
export class OfferingsComponent implements OnInit {

  offerings: Object[] = [];
  courseIdent: number = NOT_SET;
  courseName: string = '';
  errorMessage: string = '';

  constructor(
    private backend: BackendService,
    private store: StoreService
  ) {
  }

  ngOnInit() {
    this.store.currentCourse.subscribe((courseIdent) => {
      this.courseIdent = courseIdent;
      this.errorMessage = '';
      if (courseIdent == NOT_SET){
	this.offerings = [];
	this.courseName = '';
      }
      else {
	this.backend.getOfferings(courseIdent).subscribe(
	  body => {
	    this.offerings = body;
	    this.courseName = body[0].course_name
	  });
      }
    });
  }

  isVisible() {
    return this.courseIdent != NOT_SET;
  }

  onSelect(rec) {
    this.store.setCurrentOffering(rec.offering_ident);
  }

  onNewOffering() {
    // FIXME
  }

}
