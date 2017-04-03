import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { CoursesComponent } from './courses/courses.component';
import { OfferingsComponent } from './offerings/offerings.component';
import { ClassesComponent } from './classes/classes.component';
import { BackendService } from './backend.service';
import { StoreService } from './store/store.service';
import { rootReducer } from './store/store.reducer';
import { ErrmsgComponent } from './errmsg/errmsg.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    OfferingsComponent,
    ClassesComponent,
    ErrmsgComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    StoreModule.provideStore(rootReducer)
  ],
  providers: [
    BackendService,
    StoreService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
