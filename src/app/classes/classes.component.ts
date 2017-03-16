import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {

  // Test data
  classes: Object[] = [
    {"course_ident":"BUGS101","course_name":"Writing Bugs for Fun and Profit",
     "offering_ident":3,"class_ident":3,"calendar":"2017-01-04","starting":"09:00"},
    {"course_ident":"BUGS101","course_name":"Writing Bugs for Fun and Profit",
     "offering_ident":3,"class_ident":4,"calendar":"2017-01-04","starting":"14:00"}
  ]

  constructor() {
  }

  ngOnInit() {
  }

}
