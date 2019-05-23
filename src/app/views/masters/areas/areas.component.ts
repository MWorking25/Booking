import { Component, OnInit, ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { Observable } from 'rxjs/observable'
import {AgGridNg2} from 'ag-grid-angular';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';
import { MastersService } from '../../../services/masters.service';
import { AreaDetails } from '../../../interfaces/area-details';
  
@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.scss']
})
export class AreasComponent implements OnInit {


  areaForm: FormGroup;

  @ViewChild('agGrid') agGrid: AgGridNg2;
  @ViewChild('modalAreaDetails') public modalAreaDetails: ModalDirective;

  areaDetails:AreaDetails[] = [{areaname:'',countryid:0,cityid:0,stateid:0}];

  countries : any;
  states : any;
  cities : any;
  rowData : any;
  pagesize = 10;
  gridApi:any;
  gridColumnApi:any;
  statusBar:any;
  sideBar:any;

   columnDefs:any;
   autoGroupColumnDef:any;
   rowSelection:any;
   rowGroupPanelShow:any;
   pivotPanelShow:any;
   paginationPageSize:any;
   paginationNumberFormatter:any;



  constructor(private _MastersService : MastersService,private http: HttpClient,private fb: FormBuilder) {

   }


  defaultColDef = {
    // editable: true,
    enableRowGroup: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
  };

  ngOnInit() {



/* 
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this imaginary file!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    }) */

  
    
    
    this.columnDefs = [
      {headerName: 'Make', field: 'make', checkboxSelection: true,pinned: 'left'},
      {headerName: 'Model', field: 'model' },
      {headerName: 'Price', field: 'price' }
  ];
  this.autoGroupColumnDef = {
    headerName: "Group",
    width: 200,
    field: "athlete",
    valueGetter: function(params) {
      if (params.node.group) {
        return params.node.key;
      } else {
        return params.data[params.colDef.field];
      }
    },
    headerCheckboxSelection: true,
    cellRenderer: "agGroupCellRenderer",
    cellRendererParams: { checkbox: true }
  };
  this.defaultColDef = {
    // editable: true,
    enableRowGroup: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
   
  };

  this.sideBar = ["filters","columns"];
  this.statusBar = {
    statusPanels: [
      {
        statusPanel: "agTotalRowCountComponent",
        align: "left"
      },
      { statusPanel: "agFilteredRowCountComponent" },
      { statusPanel: "agSelectedRowCountComponent" },
      { statusPanel: "agAggregationComponent" }
    ]
  };
  // this.rowSelection = "multiple";
  this.rowSelection = "single";
  this.rowGroupPanelShow = "always";
  this.pivotPanelShow = "always";
  this.paginationPageSize = 10;
  this.paginationNumberFormatter = function(params) {
    return "[" + params.value.toLocaleString() + "]";
  };


  this.getCountriesList();

}

getCountriesList()
{ 
  this._MastersService.getCountriesList().subscribe((res:any)=>{
    this.countries = res;
  });	
}

getStatesOnCountry(countryid)
{ 
  this._MastersService.getStatesListOnCountry(countryid).subscribe((res:any)=>{
    this.states = res;
  });	
}

getCitiesOnSate(stateid)
{ 
  this._MastersService.getCitiesListOnState(stateid).subscribe((res:any)=>{
    this.cities = res;
  });	
}

  onPageSizeChanged(newageSize) {
    var value = this.pagesize;
    this.gridApi.paginationSetPageSize(Number(value));
  }


  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    console.log(selectedRows)
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.http
      .get('https://api.myjson.com/bins/15psn9')
      .subscribe(data => {
        this.rowData = data;
        params.api.paginationGoToPage(4);
      });
  }


  SaveAreaDetails(areadetails)
  {
    console.log(areadetails.value);
  }

}
