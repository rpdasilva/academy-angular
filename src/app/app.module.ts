import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { OfferingsComponent } from './offerings/offerings.component';
import { ClassesComponent } from './classes/classes.component';
import { CoursesService } from './courses.service';
import { OfferingsService } from './offerings.service';
import { ClassesService } from './classes.service';

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
    CoursesService,
    OfferingsService,
    ClassesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
