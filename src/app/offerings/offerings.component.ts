import { Component, OnInit } from '@angular/core';
import { OfferingsService } from '../offerings.service';

@Component({
  selector: 'app-offerings',
  templateUrl: './offerings.component.html',
  styleUrls: ['./offerings.component.css']
})
export class OfferingsComponent implements OnInit {

  offerings: Object[] = [];

  constructor(private offeringsService: OfferingsService) {
  }

  ngOnInit() {
    this.offeringsService.getData().subscribe(
      body => {this.offerings = body;});
  }

}
