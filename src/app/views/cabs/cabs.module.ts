import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CabsRoutingModule } from './cabs-routing.module';
import { ListComponent } from './list/list.component';
import { BookingComponent } from './booking/booking.component';

@NgModule({
  declarations: [ListComponent, BookingComponent],
  imports: [
    CommonModule,
    CabsRoutingModule
  ]
})
export class CabsModule { }
