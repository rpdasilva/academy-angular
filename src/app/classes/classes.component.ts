import { Component, OnInit } from '@angular/core';
import { DataFetcherService } from '../data-fetcher.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  classes: Object[] = [];

  constructor(private dataFetcher: DataFetcherService) {
  }

  ngOnInit() {
    this.dataFetcher.getData('http://localhost:3654/classes/3').subscribe(
      body => {this.classes = body;});
  }

}
