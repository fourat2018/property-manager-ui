import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PropertyComponent } from './property/property.component';

 import { HttpModule } from '@angular/http';
 import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule }     from './app-routing.module';

import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    PropertyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
