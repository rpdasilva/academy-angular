import { Component, OnInit } from '@angular/core';
import { DataFetcherService } from '../data-fetcher.service';

@Component({
  selector: 'app-offerings',
  templateUrl: './offerings.component.html',
  styleUrls: ['./offerings.component.css']
})
export class OfferingsComponent implements OnInit {

  offerings: Object[] = [];

  constructor(private dataFetcher: DataFetcherService) {
  }

  ngOnInit() {
    this.dataFetcher.getData('http://localhost:3654/offerings/2').subscribe(
      body => {this.offerings = body;});
  }

}
