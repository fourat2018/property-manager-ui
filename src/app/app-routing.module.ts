import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PropertyComponent }   from './property/property.component';


const routes: Routes = [
  { path: '', redirectTo: '/index.html', pathMatch: 'full' },
  { path: 'index.html', component: PropertyComponent },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/