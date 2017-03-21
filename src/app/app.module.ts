import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { OfferingsComponent } from './offerings/offerings.component';
import { ClassesComponent } from './classes/classes.component';
import { BackendService } from './backend.service';
import { StoreService } from './store.service';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    OfferingsComponent,
    ClassesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    BackendService,
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
