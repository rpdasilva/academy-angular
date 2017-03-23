import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { StoreService, NOT_SET } from '../store.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  classes: Object[] = [];
  offeringId: number = NOT_SET;
  courseName: string = '';
  errorMessage: string = '';

  newClassDate: string = '';
  newClassTime: string = '';

  constructor(
    private backend: BackendService,
    private store: StoreService
  ) {
  }

  ngOnInit() {
    this.store.currentOffering.subscribe((offeringId) => {
      this.offeringId = offeringId;
      this.errorMessage = '';
      if (offeringId == NOT_SET) {
	this.classes = [];
	this.offeringId = NOT_SET;
	this.courseName = '';
      }
      else {
	this.backend.getClasses(offeringId).subscribe(
	  body => {
	    this.classes = body;
	    this.courseName = body[0].course_name;
	    this.offeringId = body[0].offering_id;
	  });
      }
    });
  }

  isVisible() {
    return this.offeringId != NOT_SET;
  }

  onSelect(rec) {
    this.store.setCurrentClass(rec.class_id);
  }

  onNewClass(classDate, classTime) {
    this.backend.addClass(this.offeringId, classDate, classTime).subscribe(
      ({success, payload}) => {
	if (success) {
	  this.classes = [...this.classes, payload];
	  this.errorMessage = '';
	}
	else {
	  this.errorMessage = payload;
	}
      });
  }

  onDeleteClass(rec) {
    this.backend.deleteClass(rec.class_id).subscribe(
      ({success, payload}) => {
        if (success) {
          this.classes = payload;
          this.errorMessage = '';
        }
        else {
          this.errorMessage = payload;
        }
      });
  }

}
