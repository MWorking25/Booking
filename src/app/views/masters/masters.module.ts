import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgGridModule} from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import {FileUploadModule} from "ng2-file-upload"

import { MastersRoutingModule } from './masters-routing.module';
import { AreasComponent } from './areas/areas.component';
import { MembersComponent } from './members/members.component';
import { TrainsComponent } from './trains/trains.component';
import { OffersComponent } from './offers/offers.component';
import { UsersComponent } from './users/users.component';
import { HotelAminitiesComponent } from './hotel-aminities/hotel-aminities.component';

@NgModule({
  declarations: [AreasComponent, MembersComponent, TrainsComponent, OffersComponent, UsersComponent, HotelAminitiesComponent],
  imports: [
    CommonModule,
    MastersRoutingModule,
    HttpClientModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    ModalModule.forRoot()
  ]
})
export class MastersModule { }
