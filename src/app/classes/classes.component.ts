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
  offeringIdent = NOT_SET;
  courseName = '';

  constructor(
    private backend: BackendService,
    private store: StoreService
  ) {
  }

  ngOnInit() {
    this.store.currentOffering.subscribe((offeringIdent) => {
      this.offeringIdent = offeringIdent;
      this.errorMessage = '';
      if (offeringIdent == NOT_SET) {
	this.classes = [];
	this.offeringIdent = NOT_SET;
	this.courseName = '';
      }
      else {
	this.backend.getClasses(offeringIdent).subscribe(
	  body => {
	    this.classes = body;
	    this.offeringIdent = body[0].offering_ident;
	    this.courseName = body[0].course_name;
	  });
      }
    });
  }

  isVisible() {
    return this.offeringIdent != NOT_SET;
  }

  onSelect(rec) {
    this.store.setCurrentClass(rec.class_ident);
  }

}
