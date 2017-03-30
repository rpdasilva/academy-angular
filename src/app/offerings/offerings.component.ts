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
  currentCourseId: number = NOT_SET;
  currentCourseName: string = '';
  currentOfferingId: number = NOT_SET;

  constructor(
    private backend: BackendService,
    private store: StoreService
  ) {
  }

  ngOnInit() {
    this.store.select('offeringList').subscribe(
      offerings => {this.offerings = offerings;});
    this.store.select('currentCourseId')
      .filter(id => id > -1) // FIXME: should be (id != NOT_SET) ??
      .subscribe(
        courseId => {
          this.currentCourseId = courseId;
          this.backend.getOfferings(courseId);
        });
    this.store.select('currentCourseName').subscribe(
      courseName => {this.currentCourseName = courseName;});
    this.store.select('currentOfferingId').subscribe(
      offeringId => {this.currentOfferingId = offeringId;});
  }

  isVisible() {
    return this.currentCourseId != NOT_SET;
  }

  onSelect(rec) {
    this.store.setCurrentOfferingId(rec.offeringId);
  }

  onNewOffering() {
    this.backend.addOffering(this.currentCourseId);
  }

  onDeleteOffering(rec) {
    this.backend.deleteOffering(rec.offeringId);
  }
}
