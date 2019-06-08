import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicalsOnRentRoutingModule } from './vehicals-on-rent-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { BookingComponent } from './booking/booking.component';

@NgModule({
  declarations: [ListComponent, DetailsComponent, BookingComponent],
  imports: [
    CommonModule,
    VehicalsOnRentRoutingModule
  ]
})
export class VehicalsOnRentModule { }
