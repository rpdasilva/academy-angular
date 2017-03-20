import { Component, OnInit } from '@angular/core';
import { DataFetcherService } from '../data-fetcher.service';
import { StoreService, NOT_SET } from '../store.service';

@Component({
  selector: 'app-offerings',
  templateUrl: './offerings.component.html',
  styleUrls: ['./offerings.component.css']
})
export class OfferingsComponent implements OnInit {

  offerings: Object[] = [];
  courseName: '';
  visible = false;

  constructor(
    private dataFetcher: DataFetcherService,
    private store: StoreService
  ) {
  }

  ngOnInit() {
    this.store.currentCourse.subscribe((courseIdent) => {
      if (courseIdent == NOT_SET){
	this.visible = false;
	this.offerings = [];
	this.courseName = '';
      }
      else {
	this.visible = true;
	this.dataFetcher.getData(`http://localhost:3654/offerings/${courseIdent}`).subscribe(
	  body => {this.offerings = body; this.courseName = body[0].course_name});
      }
    });
  }

  onSelect(rec) {
    this.store.setCurrentOffering(rec.offering_ident);
  }

}
