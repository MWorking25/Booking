import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MastersRoutingModule } from './masters-routing.module';
import { AreasComponent } from './areas/areas.component';
import { MembersComponent } from './members/members.component';
import { TrainsComponent } from './trains/trains.component';
import { OffersComponent } from './offers/offers.component';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [AreasComponent, MembersComponent, TrainsComponent, OffersComponent, UsersComponent],
  imports: [
    CommonModule,
    MastersRoutingModule
  ]
})
export class MastersModule { }
