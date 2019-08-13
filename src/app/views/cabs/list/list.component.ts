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
  vehical: any;
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
      {headerName: 'Driver', field: 'driver',pinned: 'left'},
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

    this.getVehicalsListList();

    params.api.paginationGoToPage(4);
  }

  getVehicalsListList()
  {
    this._CabsNBusesService.getVehicalsListList().subscribe((res:any)=>{
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
      
      this.vehical =  this.selectedRows[0].id;

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
