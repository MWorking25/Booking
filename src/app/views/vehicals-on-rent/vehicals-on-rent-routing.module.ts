import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { BookingComponent } from './booking/booking.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {path:'vehicalonrent',component:ListComponent, data: {
    title: 'Vehicals On Rent'
  }},
  {path:'booking',component:BookingComponent,data: {
    title: 'Vehicals Bookings'
  }},
  {path:'details/:id',component:DetailsComponent,data: {
    title: 'Vehicals Details'
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehicalsOnRentRoutingModule { }
