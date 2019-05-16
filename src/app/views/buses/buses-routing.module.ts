import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  {path:'list',component:ListComponent, data: {
    title: 'Buses'
  }},
  {path:'booking',component:BookingComponent,data: {
    title: 'Buses Bookings'
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BusesRoutingModule { }
