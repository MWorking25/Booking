import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AgGridModule} from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import {FileUploadModule} from "ng2-file-upload"
import { AngularEditorModule } from '@sedlan/angular-edit';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { CabsRoutingModule } from './cabs-routing.module';
import { ListComponent } from './list/list.component';
import { BookingComponent } from './booking/booking.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [ListComponent, BookingComponent, DetailsComponent],
  imports: [
    CommonModule,
    CabsRoutingModule,
    AngularEditorModule,
    FormsModule, 
    ReactiveFormsModule,
    AgGridModule,
    HttpClientModule,
    FileUploadModule,
    CollapseModule.forRoot(),
  ]
})
export class CabsModule { }
