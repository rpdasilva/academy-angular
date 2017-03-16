import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../classes.service';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  classes: Object[];

  constructor(private classesService: ClassesService) {
  }

  ngOnInit() {
    this.classes = this.classesService.getData();
  }

}
