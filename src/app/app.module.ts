import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent, CourseComponent, OfferingComponent, ClassComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseComponent,
    OfferingComponent,
    ClassComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
