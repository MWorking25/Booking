import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { HotelsComponent } from './hotels/hotels.component';
import { RestraurantsComponent } from './restraurants/restraurants.component';
import { ExperiencesComponent } from './experiences/experiences.component';
import { CabsComponent } from './cabs/cabs.component';
import { BusesComponent } from './buses/buses.component';

@NgModule({
  declarations: [HotelsComponent, RestraurantsComponent, ExperiencesComponent, CabsComponent, BusesComponent],
  imports: [
    CommonModule,
    ReportsRoutingModule
  ]
})
export class ReportsModule { }
