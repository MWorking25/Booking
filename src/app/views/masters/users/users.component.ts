import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FileUploader} from "ng2-file-upload";
import {Observable} from "rxjs";
import Swal from 'sweetalert2';
import { Users } from '../../../interfaces/users';
import { MastersService } from '../../../services/masters.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userRoles = ["Superadmin","Admin"];
  accessStatus = [{name:"Active",value:0},{name:"Block",value:1}];

  @ViewChild('userProfile')
  myInputVariable: ElementRef;


  userDetails:Users[] = [{id:0,email:'',name:'',mobile:null,profilepic:'',role:'',status:0,createddate:new Date()}];
  url:any;
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



  public uploader:FileUploader = new FileUploader({
    isHTML5: true
  });

  constructor(private _MastersService : MastersService, private fb: FormBuilder) { }

  SaveuserDetails(usersDetails){
    if(this.uploader.queue.length > 0)
    {
    for (let j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      data.append('file', fileItem);
      data.append('userdetails', JSON.stringify(usersDetails.value));
      this.uploadFile(data);
    }
  }
  else
  {
    this.saveuserdetailasWithoutPic(usersDetails.value);
  }
    
}

  resetImage(){
    this.myInputVariable.nativeElement.value = "";
    this.url =''
    this.uploader.clearQueue();
}

    uploadFile(data: FormData){

      this._MastersService.SaveUserDetails(data).subscribe((res:any)=>{
        Swal.fire({
          title: res.title,
          text: res.message,
          type: res.type,
        }).then((result) => {
          if(res.status === 1)
          {

          }
          else{
            location.reload();
          }
        });
      });
    }

    saveuserdetailasWithoutPic(usersDetails){

      this._MastersService.SaveUserDetailsWIthoutPic(usersDetails).subscribe((res:any)=>{
        Swal.fire({
          title: res.title,
          text: res.message,
          type: res.type,
        }).then((result) => {
          if(res.status === 1)
          {

          }
          else
          {
            location.reload();
          }
        });
      });
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
   /*  this.uploadForm = this.fb.group({
      document: [null, null],
      type:  [null, Validators.compose([Validators.required])]
    }); */

    
    this.columnDefs =[
      {headerName: 'Name', field: 'name', checkboxSelection: true,pinned: 'left'},
      {headerName: 'Email', field: 'email' },
      {headerName: 'Mobile', field: 'mobile' },
      {headerName: 'Role', field: 'role' },
      {headerName: 'Active Status', field: 'userstatus' },
      {headerName: 'Date of Creation', field: 'creationdate',filter:'agDateColumnFilter', filterParams:{
        comparator:function (filterLocalDateAtMidnight, cellValue){
            var dateAsString = cellValue;
            var dateParts  = dateAsString.split("/");
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
    }, floatingFilterComponentParams:{
        suppressFilterButton:true
    } }
    ];

    this.rowSelection = "single";
    this.rowGroupPanelShow = "always";
    this.paginationPageSize = 10;
    this.paginationNumberFormatter = function(params) {
      return "[" + params.value.toLocaleString() + "]";
    };
    }


    onSelectFile(event) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
  
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        
        reader.onload = (event:Event) => { // called once readAsDataURL is completed
            this.url = event.currentTarget;
            this.url = this.url.result;
        }
      }
    }

    

    getUsersList()
  {
    this._MastersService.getUsersList().subscribe((res:any)=>{
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

    this.getUsersList();
    
    params.api.paginationGoToPage(4);
  }
    

  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
     this.userDetails = [{id:selectedRows[0].id,name:selectedRows[0].name,email:selectedRows[0].email,mobile:selectedRows[0].mobile,role:selectedRows[0].role,status:selectedRows[0].status,profilepic:selectedRows[0].profilepic,createddate:new Date(selectedRows[0].createddate)}];
     this.url = 'http://localhost:3800/unity/uploads/'+selectedRows[0].profilepic;
  }


  DeleteUsersDetails()
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

        this._MastersService.DeleteUsersDetails(this.gridApi.getSelectedRows()).subscribe((res:any)=>{
          Swal.fire({
            title: res.title,
            text: res.message,
            type: res.type,
          }).then((result) => {
            if(res.status === 1)
            {
              this.getUsersList();
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


}
