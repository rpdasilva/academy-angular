import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-errmsg',
  templateUrl: './errmsg.component.html',
  styleUrls: ['./errmsg.component.css']
})
export class ErrmsgComponent implements OnInit {

  message: string = '';

  constructor(
    private store: StoreService
  ) {
  }

  ngOnInit() {
    this.store.select('errorMessage').subscribe(msg => {
      if (msg) {
        this.message = msg;
      }
      else {
        this.message = '---';
      }
    });
  }

}
