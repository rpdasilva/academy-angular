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
  currentOfferingId: number = NOT_SET;
  currentCourseName: string = '';

  newClassDate: string = '';
  newClassTime: string = '';

  constructor(
    private backend: BackendService,
    private store: StoreService
  ) {
  }

  ngOnInit() {
    this.store.select('classList').subscribe(
      freshClasses => {this.classes = freshClasses;});
    this.store.select('currentOfferingId')
      .filter(id => id > -1) // FIXME: should be id => id != NOT_SET (?)
      .subscribe(freshOfferingId => {
        this.currentOfferingId = freshOfferingId;
        this.backend.getClasses(freshOfferingId);
      });
    this.store.select('currentCourseName').subscribe(
      freshCourseName => {this.currentCourseName = freshCourseName;});
  }

  isVisible() {
    return this.currentOfferingId != NOT_SET;
  }

  onNewClass(classDate, classTime) {
    this.backend.addClass(this.currentOfferingId, classDate, classTime);
  }

  onDeleteClass(rec) {
    this.backend.deleteClass(rec.classId);
  }
}
