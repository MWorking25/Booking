import {Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FileUploader } from "ng2-file-upload";
import { Observable } from "rxjs";
import Swal from 'sweetalert2';
import { HotelsService } from '../../../services/hotels.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  selectedRows: any;
  rowData: any;
  pagesize = 10;
  gridApi: any;
  gridColumnApi: any;
  statusBar: any;
  sideBar: any;
  columnDefs: any;
  autoGroupColumnDef: any;
  rowSelection: any;
  rowGroupPanelShow: any;
  pivotPanelShow: any;
  paginationPageSize: any;
  paginationNumberFormatter: any;
  defaultColDef = {
    // editable: true,
    enableRowGroup: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
  };
  
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

  constructor(private fb: FormBuilder,private _hotelService : HotelsService) { }

  ngOnInit() {

    this.columnDefs = [{
      headerName: 'Name',
      field: 'name',
      checkboxSelection: true,
      pinned: 'left'
    },
    {
      headerName: 'Address',
      field: 'email'
    },
    {
      headerName: 'Mobile',
      field: 'mobile'
    },
    {
      headerName: 'Role',
      field: 'role'
    },
    {
      headerName: 'Active Status',
      field: 'userstatus'
    },
    {
      headerName: 'Date of Creation',
      field: 'creationdate',
      filter: 'agDateColumnFilter',
      filterParams: {
        comparator: function (filterLocalDateAtMidnight, cellValue) {
          var dateAsString = cellValue;
          var dateParts = dateAsString.split("/");
          var cellDate = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));

          if (filterLocalDateAtMidnight.getTime() == cellDate.getTime()) {
            return 0
          }

          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          }

          if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
        }
      },
      floatingFilterComponentParams: {
        suppressFilterButton: true
      }
    }
  ];
    
  }

}
