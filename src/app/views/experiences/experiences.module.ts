import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {AgGridModule} from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AngularEditorModule } from '@sedlan/angular-edit';
import {FileUploadModule} from "ng2-file-upload"

import { ExperiencesRoutingModule } from './experiences-routing.module';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { BookingComponent } from './booking/booking.component';
import { CruzedeailsComponent } from './cruzedeails/cruzedeails.component';
import { CruzeBookingComponent } from './cruze-booking/cruze-booking.component';
import { CruzeListComponent } from './cruze-list/cruze-list.component';

@NgModule({
  declarations: [DetailsComponent, ListComponent, BookingComponent, CruzedeailsComponent, CruzeBookingComponent, CruzeListComponent],
  imports: [
    CommonModule,
    ExperiencesRoutingModule,
    AngularEditorModule,
    HttpClientModule,
    FileUploadModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
  ]
})
export class ExperiencesModule { }
