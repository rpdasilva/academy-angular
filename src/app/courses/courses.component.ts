import { Component, OnInit } from '@angular/core';
import { DataFetcherService } from '../data-fetcher.service';
import { StoreService, NOT_SET } from '../store.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Object[] = [];

  constructor(
    private dataFetcher: DataFetcherService,
    private store: StoreService
  ) {
  }

  ngOnInit() {
    this.dataFetcher.getData('http://localhost:3654/courses').subscribe(
      body => {this.courses = body;});
  }

  onSelect(rec) {
    this.store.setCurrentCourse(rec.course_ident);
  }

}
