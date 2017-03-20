import { Component, OnInit } from '@angular/core';
import { DataFetcherService } from '../data-fetcher.service';
import { StoreService, NOT_SET } from '../store.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  classes: Object[] = [];
  visible = false;

  constructor(
    private dataFetcher: DataFetcherService,
    private store: StoreService
  ) {
  }

  ngOnInit() {
    this.store.currentOffering.subscribe((offeringIdent) => {
      if (offeringIdent == NOT_SET) {
	this.visible = false;
	this.classes = [];
      }
      else {
	this.visible = true;
	this.dataFetcher.getData(`http://localhost:3654/classes/${offeringIdent}`).subscribe(
	  body => {this.classes = body;});
      }
    });
  }

  onSelect(rec) {
    this.store.setCurrentClass(rec.class_ident);
  }

}
