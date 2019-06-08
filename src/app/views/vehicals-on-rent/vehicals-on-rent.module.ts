import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgGridModule} from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import {FileUploadModule} from "ng2-file-upload"
import { AngularEditorModule } from '@sedlan/angular-edit';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { VehicalsOnRentRoutingModule } from './vehicals-on-rent-routing.module';
import { ListComponent } from './list/list.component';
import { DetailsComponent } from './details/details.component';
import { BookingComponent } from './booking/booking.component';

@NgModule({
  declarations: [ListComponent, DetailsComponent, BookingComponent],
  imports: [
    CommonModule,
    VehicalsOnRentRoutingModule,
    AngularEditorModule,
    FormsModule, 
    ReactiveFormsModule,
    AgGridModule,
    HttpClientModule,
    FileUploadModule,
    CollapseModule.forRoot(),
  ]
})
export class VehicalsOnRentModule { }
