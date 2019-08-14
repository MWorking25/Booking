import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CabsNBusesService } from '../../../services/cabs-n-buses.service';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  
  selectedRows: any;
  cabid: any;
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

  constructor(private _CabsNBusesService:CabsNBusesService) { }

  ngOnInit() {
    this.columnDefs =[
      {headerName: 'Conpany', field: 'company', checkboxSelection: true,pinned: 'left'},
      {headerName: 'Driver', field: 'driver_name',pinned: 'left'},
      {headerName: 'Model', field: 'model' },
      {headerName: 'Passing No.', field: 'passingno' },
      {headerName: 'Cpacity', field: 'cpacity' },
      {headerName: 'Colour', field: 'color' },
      {headerName: 'Price', field: 'price' },
      {headerName: 'Discounted Price', field: 'discounted_price' }
    ]
  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.getcabsList();

    params.api.paginationGoToPage(4);
  }

  getcabsList()
  {
    this._CabsNBusesService.getcabsList().subscribe((res:any)=>{
      if (res.status === 0) {
        this.rowData = [];
      } else {
        this.rowData = res;
      }
    });
  }

  deleteCabDetails()
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

    var cabIds = [];
    this.selectedRows.map((value,index)=>{

      cabIds.push(value.id);

      if(index === this.selectedRows.length - 1)
      {
        this._CabsNBusesService.deleteCabDetails(cabIds).subscribe((res: any) => {
          Swal.fire({
            title: res.title,
            text: res.message,
            type: res.type,
          }).then((result) => {
            if (res.status === 1) {
      
            } else {
              this.getcabsList();
              this.selectedRows =[];
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

  onSelectionChanged() {
    this.selectedRows = this.gridApi.getSelectedRows();
    if (this.selectedRows.length > 0) {
      
      this.cabid =  this.selectedRows[0].id;

    }
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
