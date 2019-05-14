import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExperiencesRoutingModule } from './experiences-routing.module';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { BookingComponent } from './booking/booking.component';

@NgModule({
  declarations: [DetailsComponent, ListComponent, BookingComponent],
  imports: [
    CommonModule,
    ExperiencesRoutingModule
  ]
})
export class ExperiencesModule { }
