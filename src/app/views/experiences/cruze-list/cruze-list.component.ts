import {Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FileUploader } from "ng2-file-upload";
import { Observable } from "rxjs";
import Swal from 'sweetalert2';
import { ExperiencesService } from '../../../services/experiences.service';
@Component({
  selector: 'app-cruze-list',
  templateUrl: './cruze-list.component.html',
  styleUrls: ['./cruze-list.component.scss']
})
export class CruzeListComponent implements OnInit {


  
  selectedRows: any;
  cruzid: number = 0;;
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

  constructor(private _ExperiencesService : ExperiencesService) { }

  ngOnInit() {
    
    this.columnDefs = [
      {
        headerName: 'Name',
        field: 'name',
        checkboxSelection: true,
        pinned: 'left'
      },
      {
        headerName: 'Price',
        field: 'price'
      },
      {
        headerName: 'Discounted Price',
        field: 'discounted_price'
      },
      {
        headerName: 'IGST',
        field: 'igst'
      },
      {
        headerName: 'SGST',
        field: 'sgst'
      },
      {
        headerName: 'CGST',
        field: 'cgst'
      },
      {
        headerName: 'Capacity',
        field: 'capacity'
      },
    ];
  }


  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.getCruzList();

    params.api.paginationGoToPage(4);
  }

  getCruzList()
  {
    this._ExperiencesService.getCruzList().subscribe((res: any) => {
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
      
      this.cruzid =  this.selectedRows[0].id;

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
