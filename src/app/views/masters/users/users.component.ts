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
  userRoles = ["Superadmin","Admin"]

  @ViewChild('userProfile')
  myInputVariable: ElementRef;


  userDetails:Users[] = [{id:0,email:'',name:'',mobile:null,profilepic:'',role:'',status:0,createddate:''}];
  url:'';
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
      console.log(usersDetails);
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
    }


    onSelectFile(event) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
  
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        
        reader.onload = (event) => { // called once readAsDataURL is completed

            this.url = event.target.result;
          
        }
      }
    }


}
