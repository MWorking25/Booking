import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { BookingsComponent } from './bookings/bookings.component';

const routes: Routes = [
  {path:'hotels',component:ListComponent, data: {
    title: 'Hotels'
  }},
  {path:'booking',component:BookingsComponent,data: {
    title: 'Hotels Bookings'
  }},
  {path:'details',component:DetailsComponent,data: {
    title: 'Hotels Details'
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelsRoutingModule { }
