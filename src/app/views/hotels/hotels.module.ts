import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {AgGridModule} from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
// import { NgxEditorModule } from 'ngx-editor';

import { AngularEditorModule } from '@sedlan/angular-edit';
import {FileUploadModule} from "ng2-file-upload"
import { HotelsRoutingModule } from './hotels-routing.module';
import { DetailsComponent } from './details/details.component';
import { ListComponent } from './list/list.component';
import { BookingsComponent } from './bookings/bookings.component';

@NgModule({
  declarations: [DetailsComponent, ListComponent, BookingsComponent],
  imports: [
    CommonModule,
    HotelsRoutingModule,
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
export class HotelsModule { }
