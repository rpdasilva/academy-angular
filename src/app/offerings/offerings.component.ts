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
    this.store.offeringList.subscribe(
      freshOfferings => {
	this.offerings = freshOfferings;
      });
    this.store.currentCourseId.subscribe(
      freshCourseId => {
	this.currentCourseId = freshCourseId;
	this.backend.getOfferings(freshCourseId);
      });
    this.store.currentCourseName.subscribe(
      freshCourseName => {
	this.currentCourseName = freshCourseName;
      });
    this.store.currentOfferingId.subscribe(
      freshOfferingId => {
	this.currentOfferingId = freshOfferingId;
      });
  }

  isVisible() {
    return this.currentCourseId != NOT_SET;
  }

  onSelect(rec) {
    this.store.setCurrentOfferingId(rec.offering_id);
  }

  onNewOffering() {
    this.backend.addOffering(this.currentCourseId);
  }

  onDeleteOffering(rec) {
    this.backend.deleteOffering(rec.offering_id);
  }
}
