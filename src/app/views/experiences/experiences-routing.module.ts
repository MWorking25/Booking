import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { BookingComponent } from './booking/booking.component';

import { CruzedeailsComponent } from './cruzedeails/cruzedeails.component';
import { CruzeListComponent } from './cruze-list/cruze-list.component';
import { CruzeBookingComponent } from './cruze-booking/cruze-booking.component';

const routes: Routes = [
  {path:'list',component:ListComponent, data: {
    title: 'Experiences'
  }},
  {path:'booking',component:BookingComponent,data: {
    title: 'Experiences Bookings'
  }},
  {path:'details',component:DetailsComponent,data: {
    title: 'Experiences Details'
  }},
  {path:'cruzelist',component:CruzeListComponent, data: {
    title: 'Cruze'
  }},
  {path:'cruzebooking',component:CruzeBookingComponent,data: {
    title: 'Cruze Bookings'
  }},
  {path:'cruzedetails/:id',component:CruzedeailsComponent,data: {
    title: 'Cruze Details'
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperiencesRoutingModule { }
