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
  courseId: number = NOT_SET;
  courseName: string = '';
  errorMessage: string = '';

  newOfferingStartDate: string = '';
  newOfferingStartTime: string = '';

  constructor(
    private backend: BackendService,
    private store: StoreService
  ) {
  }

  ngOnInit() {
    this.store.currentCourse.subscribe((courseId) => {
      this.courseId = courseId;
      this.errorMessage = '';
      if (courseId == NOT_SET){
	this.offerings = [];
	this.courseName = '';
      }
      else {
	this.backend.getOfferings(courseId).subscribe(
	  body => {
	    this.offerings = body;
	    this.courseName = body[0].course_name
	  });
      }
    });
  }

  isVisible() {
    return this.courseId != NOT_SET;
  }

  onSelect(rec) {
    this.store.setCurrentOffering(rec.offering_id);
  }

  onNewOffering(startDate, startTime) {
    this.backend.addOffering(this.courseId, startDate, startTime).subscribe(
      ({success, payload}) => {
	if (success) {
	  this.offerings = [...this.offerings, payload];
	  this.errorMessage = '';
	}
	else {
	  this.errorMessage = payload;
	}
      });
  }

  onDeleteOffering(rec) {
    this.backend.deleteOffering(rec.offering_id).subscribe(
      ({success, payload}) => {
        if (success) {
          this.offerings = payload;
          this.errorMessage = '';
        }
        else {
          this.errorMessage = payload;
        }
      });
  }

}
