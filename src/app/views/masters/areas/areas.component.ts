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

  areaDetails:AreaDetails[] = [{id:0,areaname:'',countryid:0,cityid:0,stateid:0}];

  tableParams : any;
  countries : any;
  states : any;
  cities : any;
  selectedRows : any;
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

  
    
    
    this.columnDefs =[
                        {headerName: 'Name', field: 'name', checkboxSelection: true,pinned: 'left'},
                        {headerName: 'City', field: 'cityname' },{headerName: 'State', field: 'statename' },{headerName: 'Country', field: 'countryname' }],

  this.defaultColDef = {
    // editable: true,
    enableRowGroup: true,
    enableValue: true,
    sortable: true,
    resizable: true,
    filter: true,
   
  };


  // this.rowSelection = "multiple";
  this.rowSelection = "single";
  this.rowGroupPanelShow = "always";
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
    this.selectedRows = this.gridApi.getSelectedRows();
    var selectedRows = this.selectedRows;
    if (selectedRows.length > 0 ) {
     this.getStatesOnCountry(selectedRows[0].countryid);
     this.getCitiesOnSate(selectedRows[0].stateid);
     this.areaDetails = [{id:selectedRows[0].id,areaname:selectedRows[0].name,countryid:selectedRows[0].countryid,cityid:selectedRows[0].cityid,stateid:selectedRows[0].stateid}];
    }
  }

  GetAreasList()
  {
    this._MastersService.getAreaslist().subscribe((res:any)=>{
      if(res.status === 0)
      {
        this.rowData = [];
      }
      else{
        this.rowData = res;
      }
    });	
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.GetAreasList();
    
    params.api.paginationGoToPage(4);
  }


  SaveAreaDetails(areadetails)
  {
    this._MastersService.SaveAreaDetails(areadetails.value).subscribe((res:any)=>{
      Swal.fire({
        title: res.title,
        text: res.message,
        type: res.type,
      }).then((result) => {
        if(res.status === 1)
        {
          this.areaDetails = [{id:0,areaname:'',countryid:0,cityid:0,stateid:0}];
          this.GetAreasList();
        }
      });
    });
  }

  DeleteAreaDetails()
  {


    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover these records again!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {

        this._MastersService.DeleteAreaDetails(this.gridApi.getSelectedRows()).subscribe((res:any)=>{
          Swal.fire({
            title: res.title,
            text: res.message,
            type: res.type,
          }).then((result) => {
            if(res.status === 1)
            {
              this.GetAreasList();
            }
          });
        });
      // For more information about handling dismissals please visit
      // https://sweetalert2.github.io/#handling-dismissals
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
      if (this.selectedRows.length > 1) {
        return true;
      } else {
        return false;
      }
    }
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
