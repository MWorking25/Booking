import { Component, OnInit } from '@angular/core';
import { HotelAminityTitle } from '../../../interfaces/hotel-aminity-title';
import { HotelSubaminities } from '../../../interfaces/hotel-subaminities';
import Swal from 'sweetalert2';
import { MastersService } from '../../../services/masters.service';

@Component({
  selector: 'app-hotel-aminities',
  templateUrl: './hotel-aminities.component.html',
  styleUrls: ['./hotel-aminities.component.scss']
})
export class HotelAminitiesComponent implements OnInit {


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

  subaminities:HotelSubaminities[] = [{id:0,aminityid:null,name:null,createdby:null}];

  aminitiesDetails : HotelAminityTitle[] = [{id:0,amenity:null,amenity_icon:null,AminitiesList:[],createdby:null}];
 

  icons:any= [
  {display:"<i title='Room Service' class='icon icon-room-service'></i>",value:"icon-room-service"},
  {display:"<i title='Hotel Service' class='icon icon-hotel-service'></i>",value:"icon-hotel-service"},
  {display:"<i title='Receptionist' class='icon icon-girl'></i>",value:"icon-girl"},
  {display:"<i title='Maid' class='icon icon-maid'></i>",value:"icon-maid"},
  {display:"<i title='Valet' class='icon icon-valet'></i>",value:"icon-valet"},
  {display:"<i title='Laundry Service' class='icon icon-laundry-service'></i>",value:"icon-laundry-service"},
  {display:"<i title='TV' class='icon icon-television'></i>",value:"icon-television"},
  {display:"<i title='Bar' class='icon icon-cocktail'></i>",value:"icon-cocktail"},
  {display:"<i title='Restraurent' class='icon icon-fast-food'></i>",value:"icon-fast-food"},
  {display:"<i title='Wifi' class='icon icon-wifi'></i>",value:"icon-wifi"},
  {display:"<i title='Bed' class='icon icon-bed'></i>",value:"icon-bed"},
  {display:"<i title='Bathrobe' class='icon icon-bathrobe'></i>",value:"icon-bathrobe"},
  {display:"<i title='Elevator' class='icon icon-elevator'></i>",value:"icon-elevator"},
  {display:"<i title='Boat' class='icon icon-boat'></i>",value:"icon-boat"},
  {display:"<i title='DJ' class='icon icon-dj'></i>",value:"icon-dj"},
  {display:"<i title='Park' class='icon icon-park-1'></i>",value:"icon-park-1"},
  {display:"<i title='Garden' class='icon icon-park'></i>",value:"icon-park"},
  {display:"<i title='Library' class='icon icon-book'></i>",value:"icon-book"},
  {display:"<i title='Air Conditioner' class='icon icon-air-conditioner'></i>",value:"icon-air-conditioner"},
  {display:"<i title='Gym' class='icon icon-gym'></i>",value:"icon-gym"},
  {display:"<i title='Parking' class='icon icon-parking'></i>",value:"icon-parking"},
  {display:"<i title='Menu' class='icon icon-menu'></i>",value:"icon-menu"},
  {display:"<i title='Location' class='icon icon-location'></i>",value:"icon-location"},
  {display:"<i title='CCTV' class='icon icon-cctv'></i>",value:"icon-cctv"},
  {display:"<i title='Dry Cleaning' class='icon icon-hanger'></i>",value:"icon-hanger"},]

  constructor(private _mastersService : MastersService) { }

  ngOnInit() {
    this.columnDefs =[
      {headerName: 'Tital', field: 'amenity', checkboxSelection: true,pinned: 'left'},
      {headerName: 'Total Facilities', field: 'totalaminities' },
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
      },
    ];
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.getAmintiesListList();

    params.api.paginationGoToPage(4);
  }

  getAmintiesListList()
  {
    this._mastersService.getAmintiesListList().subscribe((res:any)=>{
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
    }
  }


  getAminityDetails()
  {
    this._mastersService.getAminityDetails(this.selectedRows [0].id).subscribe((res:any)=>{
      if (res.status === 0) {
        this.aminitiesDetails = [];
      } else {
        this.aminitiesDetails = res.master;
        this.aminitiesDetails[0].AminitiesList = res.subaminities;
      }
      console.log(this.aminitiesDetails)
    });
  }

  DeleteAminityDetails()
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

        this._mastersService.DeleteAminityDetails(this.gridApi.getSelectedRows()).subscribe((res:any)=>{
          Swal.fire({
            title: res.title,
            text: res.message,
            type: res.type,
          }).then((result) => {
            if(res.status === 1)
            {
              this.getAmintiesListList();
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

  AddAminity()
  {
    if(this.aminitiesDetails[0].AminitiesList.length > 0)
    {
        if(this.aminitiesDetails[0].AminitiesList[this.aminitiesDetails[0].AminitiesList.length - 1].name != null)
        {
          this.aminitiesDetails[0].AminitiesList.push({id:0,aminityid:null,name:null,createdby:null})
        }
    }
    else{
      this.aminitiesDetails[0].AminitiesList.push({id:0,aminityid:null,name:null,createdby:null})
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

  verifyAminities()
  {
    if(this.aminitiesDetails[0].amenity == null || this.aminitiesDetails[0].amenity == '')
    return true;
    else
    return false;

  }

  setIconForAminity(aminity)
  {
    this.aminitiesDetails[0].amenity_icon = aminity.value;
    this.icons.map((value,index)=>{
      if(value.value == aminity.value)
      {
        return true;
      }
      else
      {
        return false;
      }
    });
  }

  SaveAminityDetails()
  {
    this._mastersService.SaveAminityDetails(this.aminitiesDetails).subscribe((res:any)=>{
      Swal.fire({
        title: res.title,
        text: res.message,
        type: res.type,
      }).then((result) => {
        if(res.status === 1)
        {
          this.aminitiesDetails = [{id:0,amenity:null,amenity_icon:null,AminitiesList:[],createdby:null}];
          this.getAmintiesListList();
        }
      });
    });
  }

}
