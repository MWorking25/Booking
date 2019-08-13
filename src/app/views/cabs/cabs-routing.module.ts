import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { BookingComponent } from './booking/booking.component';
import { DetailsComponent } from './details/details.component';
const routes: Routes = [
  {path:'list',component:ListComponent, data: {
    title: 'Cabs'
  }},
  {path:'booking',component:BookingComponent,data: {
    title: 'Cab Bookings'
  }},
  {path:'details/:id',component:DetailsComponent,data: {
    title: 'Cab Details'
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabsRoutingModule { }
