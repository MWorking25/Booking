import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/observable';
import Swal from 'sweetalert2';
import { FileUploader, FileLikeObject } from "ng2-file-upload";
import { CabsNBusesService } from '../../../services/cabs-n-buses.service';
import $ from 'jquery';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {


  @ViewChild('cabImages')
  @ViewChild('coverImage') myInputVariable: ElementRef;

  masterid:any;
  url:any;
  urls:any;
  htmlContent:any;
  required:boolean = false;
  cabGallery:any[];

  

  cabDocs:any[] = [{id:0,cabid:0,docname:null,docimg:null,createdby:null,required:false,tempfilename:null}];
  constructor(private _CabsNBusesService:CabsNBusesService,private activatedRoute: ActivatedRoute, private toastr: ToastrService) { }


  cab_Details:any = [{id:0,company:null,model:null,passingno:null,cpacity:null,color:null,price:null,discounted_price:null,cgst:0,sgst:0,igst:0,createdby:null,description:null,driver_name:null}];

  isCollapsedGeneraldetails:boolean = false;
  isCollapsedcabImages:boolean = false;
  isCollapsedDocDetails:boolean = false;
  ngOnInit() {
    var cabid = this.activatedRoute.snapshot.paramMap.get('id');
    this.masterid = cabid;
    this.getcabDetails(cabid);
  }

  
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });


  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: Event) => { // called once readAsDataURL is completed
        this.url = event.currentTarget;
        this.url = this.url.result;
      }
    }
  }

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  resetImage() {
    this.myInputVariable.nativeElement.value = "";
    this.url = ''
    this.uploader.clearQueue();
  }

  VerifyForm()
{
  if(this.cab_Details[0].company != null && this.cab_Details[0].model != null && this.cab_Details[0].passingno != null && this.cab_Details[0].cpacity != null && this.cab_Details[0].price != null)
  {
    return false;
  }
  else{
    return true;
  }
}

savecabDetails(cabDetails)
{
  if (this.uploader.queue.length > 0) {
    for (let j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      data.append('file', fileItem);
      data.append('cabDetails', JSON.stringify(cabDetails.value));
      this.uploadFile(data);
    }
  } else {
    this.savecabDetailasWithoutPic(cabDetails.value);
  }
}

uploadFile(data: FormData) {

  this._CabsNBusesService.savecabDetails(data).subscribe((res: any) => {
    if(res.cabid > 0) 
    {
      this.cab_Details[0].id = res.cabid;
    }

    Swal.fire({
      title: res.title,
      text: res.message,
      type: res.type,
    }).then((result) => {
      if (res.status === 1) {
        this.uploader.clearQueue();
      } else {
       
      }
    });
  });
}


savecabDetailasWithoutPic(vahicaldetails)
{
  this._CabsNBusesService.savecabDetails(vahicaldetails).subscribe((res: any) => {
    if(res.cabid > 0) 
    {
      this.cab_Details[0].id = res.cabid;
    }

    Swal.fire({
      title: res.title,
      text: res.message,
      type: res.type,
    }).then((result) => {
      if (res.status === 1) {

      } else {
      }
    });
  });
}


RemoveDocument(cabdoc,index)
{
  Swal.fire({
    title: 'Are you sure?',
    text: 'Want to delete these item',
    type: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.value) {
  if(cabdoc.id === 0)
  {
    this.cabDocs.splice(index,1);
  }
  else
  {
    this._CabsNBusesService.deletecabDocDetails(cabdoc.id).subscribe((res:any)=>{
        Swal.fire({
          title: res.title,
          text: res.message,
          type: res.type,
        }).then((result) => {
          if (res.status === 1) {
            this.getcabDetails(cabdoc.cabid);
          } else {
          
          }
        });
     
    });	
  }
} else if (result.dismiss === Swal.DismissReason.cancel) {
  Swal.fire(
    'Cancelled',
    'Your imaginary file is safe :)',
    'error'
  )
}
})
}

getcabDetails(cabid)
{
  this._CabsNBusesService.getcabDetails(cabid).subscribe((res:any)=>{
    if (res.status === 0) {
    } else {
      this.cab_Details = res.cabDetails;
      if(this.cab_Details.length == 0)
      {
        this.cab_Details = [{id:0,company:null,model:null,passingno:null,cpacity:null,color:null,price:null,discounted_price:null,cgst:0,sgst:0,igst:0,createdby:null,description:null,driver_name:null}];
      }
      this.url = res.cabDetails[0].tmpdriver_pic;
      this.cabDocs = res.cabDocs;
      this.cabGallery = res.cabImages;
      this.cabGallery.push({id:0,cabid:cabid,coverpictemp:null,description:null});

    }
  });
}

addDocFile(cabdocs)
{
    var i = this.cabDocs.length - 1;
      var docobjkeys = "docname"+i;
      var docid = "docid"+i;
      for(var key in cabdocs.value)
      {
        if(String(key) == docobjkeys)
        {
          if(cabdocs.value[key] != null && cabdocs.value[key] != '')
          {
            if(this.uploader.queue[i])
            {
               this.cabDocs.push({id:0,cabid:0,docname:null,docimg:null,createdby:null});
               this.cabDocs[i].required = false;
               this.VerifyDocForm();
            }
            else
            {
              if(cabdocs.value[docid] > 0)
              {
                console.log(cabdocs.value[key] != null && cabdocs.value[key] != '')
                if(cabdocs.value[key] != null && cabdocs.value[key] != '')
                {
                  this.cabDocs.push({id:0,cabid:0,docname:null,docimg:null,createdby:null});
                  this.cabDocs[i].required = false;
                  this.VerifyDocForm();
                }
                else{
                  this.cabDocs[i].required = true;
                }
              }  
            }
          }
          else
          {
            this.cabDocs[i].required = true;
          }
        }
      }
}

VerifyDocForm()
{
  
}

savecabDocDetails(cabDocsDetails)
{
  for(var i = 0 ; i < this.cabDocs.length ;i++)
  {
    if(eval('cabDocsDetails.value.docfilename'+i) != undefined)
    {
      for (let j = 0; j < this.uploader.queue.length; j++) 
      {
          if(eval('cabDocsDetails.value.docfilename'+i) === this.uploader.queue[j]._file.name)
          {
            let data = new FormData();
            let fileItem = this.uploader.queue[j]._file;
            data.append('file', fileItem);
      
            var cabdocDetails = {docname:eval('cabDocsDetails.value.docname'+i),cabid:this.cab_Details[0].id,id:eval('cabDocsDetails.value.docid'+i),docfilename:eval('cabDocsDetails.value.docfilename'+i),createdby:null}
      
            data.append('cabDocDetails', JSON.stringify(cabdocDetails));
            this.uploadcabDocs(data,this.cabDocs.length);
          }
      }
    }
    else
    {
      var cabobj:any = {id:eval('cabDocsDetails.value.docid'+i),docname:eval('cabDocsDetails.value.docname'+i),docfilename:eval('cabDocsDetails.value.docfilename'+i)}
      this.uploadDocsWithoutpic(cabobj,this.cabDocs.length);
    }
  } 
}


uploadcabDocs(data: FormData,j) {

  this._CabsNBusesService.uploadcabDocs(data).subscribe((res: any) => {
   
    if(j === this.cabDocs.length)
    {
      Swal.fire({
        title: res.title,
        text: res.message,
        type: res.type,
      }).then((result) => {
        if (res.status === 1) {
          this.uploader.clearQueue();
          this.getcabDetails(this.masterid);
        } else {
          
        }
      });
    }
  });
}

doccounter = 0;
uploadDocsWithoutpic(data: FormData,datalength) {

  this._CabsNBusesService.uploadDocsWithoutpic(data).subscribe((res: any) => {

    this.doccounter = this.doccounter +1;
    if(datalength == this.doccounter)
    {
      Swal.fire({
        title: res.title,
        text: res.message,
        type: res.type,
      }).then((result) => {
        if (res.status === 1) {
          this.uploader.clearQueue();
          this.getcabDetails(this.masterid);
        } else {
          
        }
      });
    }
  });
}


onFileDocSelected(event,index) {
  if (event.target.files && event.target.files[0]) {
    var reader = new FileReader();
    console.log(event.target.files[0]);
    this.cabDocs[index].tempfilename = event.target.files[0].name;

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event: Event) => { // called once readAsDataURL is completed
      this.cabDocs[index].docimgtemp = event.currentTarget;
      this.cabDocs[index].docimgtemp = this.cabDocs[index].docimgtemp.result;
    }
  }
}

/* public onFileSelected(event: EventEmitter<File[]>) {
  this.urls = [];
    let files = event;
    if (files) {
      for (let file in files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.urls.push({coverpictemp:e.target.result});
        }
        if(file != 'length')
        {
          if(file != 'item')
          {
            reader.readAsDataURL(files[file]);
          }
        } 
      }
    }
} */

/* uploadcabImages(imagesupload)
{
 
  if (this.uploader.queue.length > 0) {
    for (let j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      data.append('file', fileItem);
      data.append('description',JSON.stringify({description:eval('imagesupload.value.description'+j) || null,cabid:this.cabDetails[0].id}));
      this.uploadImages(data,this.uploader.queue.length);
    }
  }
}
counter : number = 0;
uploadImages(formdata : FormData,imgslength)
{

    this._CabsNBusesService.uploadcabImages(formdata).subscribe((res: any) => {
        this.counter = this.counter + 1; 
        if(imgslength == this.counter)
        {
          Swal.fire({
            title: res.title,
            text: res.message,
            type: res.type,
          }).then((result) => {
            if (res.status === 1) {
              this.uploader.clearQueue();
            } else {
            
            }
           });
        }
    }); 
} */



uploadCabGalleryImage(cabDetails)
{

if(this.uploader.queue.length > 0 || (cabDetails.value.id != 0))
{

    // for (let j = 0; j < this.uploader.queue.length - 1; j++) {
      let data = new FormData();
      if(this.uploader.queue[this.uploader.queue.length - 1])
        var fileItem = this.uploader.queue[this.uploader.queue.length - 1]._file;
      data.append('file', fileItem);
      data.append('cabDetails', JSON.stringify(cabDetails.value));
      if(this.uploader.queue[this.uploader.queue.length - 1])
      this.SavecabGalleryImages(data);
      else
      this.SavecabGalleryDetails(cabDetails.value);
    // }
  }
  else
  {
    this.toastr.warning('Warning', 'Please choose image before upload');
  }
}

SavecabGalleryImages(data: FormData) {
  this._CabsNBusesService.uploadcabImages(data).subscribe((res: any) => {
    this.getcabDetails(this.masterid);
    this.uploader.clearQueue();
  });
}

SavecabGalleryDetails(data) {
  this._CabsNBusesService.uploadcabImages(data).subscribe((res: any) => {
    this.getcabDetails(this.masterid);
  });
}


public onFileSelected(event: EventEmitter<File[]>) {
    
    let files = event;
    if (files) {
      for (let file in files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.cabGallery.push({id:0,cabid:this.masterid,coverpictemp:null,description:null});
        }
        if(file != 'length')
          {
            if(file != 'item')
            {
              reader.readAsDataURL(files[file]);
            }
          } 
      }
    }
}


RemoveGalleryImage(imgdetails,index)
{
Swal.fire({
  title: 'Are you sure?',
  text: 'Want to delete these item',
  type: 'warning',
  showCancelButton: true,
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'No, keep it'
}).then((result) => {
  if (result.value) {

  this._CabsNBusesService.RemoveCabGalleryImage(imgdetails.id).subscribe((res:any)=>{
      Swal.fire({
        title: res.title,
        text: res.message,
        type: res.type,
      }).then((result) => {
        if (res.status === 1) {
  
        } else {
          this.getcabDetails(this.masterid);
         
        }
      });
   
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



OpenfileChooser(index)
{
  $("#GalaryPic"+index).click();
}

onSelectGalleryFile(event,imgobj) {
if (event.target.files && event.target.files[0]) {
  var reader = new FileReader();

  reader.readAsDataURL(event.target.files[0]); // read file as data url

  reader.onload = (event: Event) => { // called once readAsDataURL is completed
    imgobj.tempfilename= event.currentTarget;
    imgobj.tempfilename = imgobj.tempfilename.result;
  }
}
}


previewDocument(imgforPreview,index)
{
  Swal.fire({
    title: '',
    imageUrl: imgforPreview,
    imageWidth: 500,
    imageHeight: 500,
    showCloseButton: true,
    showConfirmButton:false
  }).then((result) => {
    
  });
}


}
