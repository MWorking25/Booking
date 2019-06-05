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
  hotelid: number = 0;;
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
      headerName: 'Mobile',
      field: 'mobile1'
    },
    {
      headerName: 'Email',
      field: 'email'
    },
    {
      headerName: 'Active Status',
      field: 'activestatus'
    },
    {
      headerName: 'Date of Creation',
      field: 'createddate',
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
    },
    {
      headerName: "Address",
      children: [
        {
          field: "addressline1",
          width: 100,
          columnGroupShow: "closed"
        },
        {
          field: "addressline1",
          width: 100,
          columnGroupShow: "open"
        },
        {
          field: "addressline2",
          width: 100,
          columnGroupShow: "open"
        },
        {
          field: "areaname",
          width: 100,
          columnGroupShow: "open"
        },
        {
          field: "cityname",
          width: 100,
          columnGroupShow: "open"
        },
        {
          field: "statename",
          width: 100,
          columnGroupShow: "open"
        },
        {
          field: "countryname",
          width: 100,
          columnGroupShow: "open"
        },
        
      ]
    }
  ];
    
  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.getHotelsList();

    params.api.paginationGoToPage(4);
  }


  getHotelsList()
  {
    this._hotelService.getHotelsList().subscribe((res: any) => {
      if (res.status === 0) {
        this.rowData = [];
      } else {
        this.rowData = res;
      }
    });
  }


  onSelectionChanged() {
    this.selectedRows = this.gridApi.getSelectedRows();
    if (this.selectedRows.length > 0) {
      
      this.hotelid =  this.selectedRows[0].id;

    }
  }


  DeleteHotelDetails()
  {
    
    Swal.fire({
      title: 'Are you sure?',
      text: 'Want to delete these records',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

    var hotelids = [];
    this.selectedRows.map((value,index)=>{

      hotelids.push(value.id);

      if(index === this.selectedRows.length - 1)
      {
        this._hotelService.DeleteHotelDetails(hotelids).subscribe((res: any) => {
          Swal.fire({
            title: res.title,
            text: res.message,
            type: res.type,
          }).then((result) => {
            if (res.status === 1) {
      
            } else {
              this.getHotelsList();
            }
          });
        });
      }
    });
  } else if (result.dismiss === Swal.DismissReason.cancel) {
    Swal.fire(
      'Cancelled',
      'Your imaginary file is safe :)',
      'error'
    )
  }
  })
  }


  VerifySelectedRows() {
    if (this.selectedRows) {
      if (this.selectedRows.length > 1 || this.selectedRows.length <= 0) {
        return true;
      } else {
        return false;
      }
    }
    else
      return true;
  }

  VerifySelectedRowsAdd() {
    if (this.selectedRows) {
      if (this.selectedRows.length > 0) {
        return true;
      } else {
        return false;
      }
    }
  }

  VerifySelectedRowsDelete() {
    if (!this.selectedRows) {
      return true;
    } else {
      if (this.selectedRows.length <= 0) {
        return true;
      } else {
        return false;
      }
    }
  }

}
