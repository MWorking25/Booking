import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HotelsComponent } from './hotels/hotels.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { BusesComponent } from './buses/buses.component';
import { CabsComponent } from './cabs/cabs.component';
import { RestraurantsComponent } from './restraurants/restraurants.component';

const routes: Routes = [
  {path:'hotels',component:HotelsComponent, data: {
    title: 'Hotels'
  }},
  {path:'experiences',component:ExperiencesComponent,data: {
    title: 'Experiences'
  }},
  {path:'buses',component:BusesComponent,data: {
    title: 'Buses'
  }}
  ,{path:'cabs',component:CabsComponent,data: {
    title: 'Cabs'
  }}
  ,{path:'restraurants',component:RestraurantsComponent,data: {
    title: 'Restraurants'
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
