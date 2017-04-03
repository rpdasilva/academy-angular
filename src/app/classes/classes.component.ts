import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { StoreService } from '../store/store.service';
import { NOT_SET } from '../store/store.types';

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
      classes => {this.classes = classes;});
    this.store.select('currentOfferingId')
      .subscribe(offeringId => {
        this.currentOfferingId = offeringId;
        if (offeringId != NOT_SET){
          this.backend.getClasses(offeringId);
        }
      });
    this.store.select('currentCourseName').subscribe(
      courseName => {this.currentCourseName = courseName;});
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
