import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { BookingComponent } from './booking/booking.component';

const routes: Routes = [
  {path:'',component:ListComponent, data: {
    title: 'Experiences'
  }},
  {path:'booking',component:BookingComponent,data: {
    title: 'Experiences Bookings'
  }},
  {path:'details',component:DetailsComponent,data: {
    title: 'Experiences Details'
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperiencesRoutingModule { }
