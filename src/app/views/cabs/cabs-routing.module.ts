import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  {path:'',component:ListComponent, data: {
    title: 'Cabs'
  }},
  {path:'booking',component:BookingComponent,data: {
    title: 'Cabs Bookings'
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CabsRoutingModule { }
