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

  @ViewChild('coverImage')
  @ViewChild('vehicalImages')
  myInputVariable: ElementRef;

  masterid:any;
  url:any;
  urls:any;
  htmlContent:any;
  required:boolean = false;
  vehicalGallery:any[];
  vehicalDetails:any = [{id:0,company:null,model:null,passingno:null,cpacity:null,color:null,price:null,discounted_price:null,createdby:null}];
  vehicalDocs:any[] = [{id:0,vehicalid:0,docname:null,docimg:null,createdby:null,required:false,tempfilename:null}];
  constructor(private _CabsNBusesService:CabsNBusesService,private activatedRoute: ActivatedRoute, private toastr: ToastrService) { }

  isCollapsedGeneraldetails:boolean = false;
  isCollapsedvehicalImages:boolean = false;
  isCollapsedDocDetails:boolean = false;
  ngOnInit() {
    var vehicalid = this.activatedRoute.snapshot.paramMap.get('id');
    this.masterid = vehicalid;
    this.getVehicalDetails(vehicalid);
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
  if(this.vehicalDetails[0].company != null && this.vehicalDetails[0].model != null && this.vehicalDetails[0].passingno != null && this.vehicalDetails[0].cpacity != null && this.vehicalDetails[0].price != null)
  {
    return false;
  }
  else{
    return true;
  }
}

saveVehicalDetails(vehicalDetails)
{
  if (this.uploader.queue.length > 0) {
    for (let j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      data.append('file', fileItem);
      data.append('vehicalDetails', JSON.stringify(vehicalDetails.value));
      this.uploadFile(data);
    }
  } else {
    this.saveVehicalDetailasWithoutPic(vehicalDetails.value);
  }
}

uploadFile(data: FormData) {

  this._CabsNBusesService.saveVehicalDetails(data).subscribe((res: any) => {
    if(res.vehicalid > 0) 
    {
      this.vehicalDetails[0].id = res.vehicalid;
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


saveVehicalDetailasWithoutPic(vahicaldetails)
{
  this._CabsNBusesService.saveVehicalDetails(vahicaldetails).subscribe((res: any) => {
    if(res.vehicalid > 0) 
    {
      this.vehicalDetails[0].id = res.vehicalid;
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


RemoveDocument(vehicaldoc,index)
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
  if(vehicaldoc.id === 0)
  {
    this.vehicalDocs.splice(index,1);
  }
  else
  {
    this._CabsNBusesService.deleteVehicalDocDetails(vehicaldoc.id).subscribe((res:any)=>{
        Swal.fire({
          title: res.title,
          text: res.message,
          type: res.type,
        }).then((result) => {
          if (res.status === 1) {
            this.getVehicalDetails(vehicaldoc.vehicalid);
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

getVehicalDetails(vehicalid)
{
  this._CabsNBusesService.getVehicalDetails(vehicalid).subscribe((res:any)=>{
    if (res.status === 0) {
      this.vehicalDetails = [];
    } else {
      this.vehicalDetails = res.vehicalDetails;
      this.url = res.vehicalDetails[0].tmpcoverpic;
      this.vehicalDocs = res.vehicalDocs;
      this.vehicalGallery = res.vehicalImages;
      this.vehicalGallery.push({id:0,vehicalid:vehicalid,coverpictemp:null,description:null});

    }
  });
}

addDocFile(vehicaldocs)
{
    var i = this.vehicalDocs.length - 1;
      var docobjkeys = "docname"+i;
      var docid = "docid"+i;
      for(var key in vehicaldocs.value)
      {
        if(String(key) == docobjkeys)
        {
          if(vehicaldocs.value[key] != null && vehicaldocs.value[key] != '')
          {
            if(this.uploader.queue[i])
            {
               this.vehicalDocs.push({id:0,vehicalid:0,docname:null,docimg:null,createdby:null});
               this.vehicalDocs[i].required = false;
               this.VerifyDocForm();
            }
            else
            {
              if(vehicaldocs.value[docid] > 0)
              {
                console.log(vehicaldocs.value[key] != null && vehicaldocs.value[key] != '')
                if(vehicaldocs.value[key] != null && vehicaldocs.value[key] != '')
                {
                  this.vehicalDocs.push({id:0,vehicalid:0,docname:null,docimg:null,createdby:null});
                  this.vehicalDocs[i].required = false;
                  this.VerifyDocForm();
                }
                else{
                  this.vehicalDocs[i].required = true;
                }
              }  
            }
          }
          else
          {
            this.vehicalDocs[i].required = true;
          }
        }
      }
}

VerifyDocForm()
{
  
}

saveVehicalDocDetails(vehicalDocsDetails)
{
  for(var i = 0 ; i < this.vehicalDocs.length ;i++)
  {
    if(eval('vehicalDocsDetails.value.docfilename'+i) != undefined)
    {
      for (let j = 0; j < this.uploader.queue.length; j++) 
      {
          if(eval('vehicalDocsDetails.value.docfilename'+i) === this.uploader.queue[j]._file.name)
          {
            let data = new FormData();
            let fileItem = this.uploader.queue[j]._file;
            data.append('file', fileItem);
      
            var vehicaldocDetails = {docname:eval('vehicalDocsDetails.value.docname'+i),vehicalid:this.vehicalDetails[0].id,id:eval('vehicalDocsDetails.value.docid'+i),docfilename:eval('vehicalDocsDetails.value.docfilename'+i),createdby:null}
      
            data.append('vehicalDocDetails', JSON.stringify(vehicaldocDetails));
            this.uploadVehicalDocs(data,this.vehicalDocs.length);
          }
      }
    }
    else
    {
      var vehicalobj:any = {id:eval('vehicalDocsDetails.value.docid'+i),docname:eval('vehicalDocsDetails.value.docname'+i),docfilename:eval('vehicalDocsDetails.value.docfilename'+i)}
      this.uploadDocsWithoutpic(vehicalobj,this.vehicalDocs.length);
    }
  } 
}


uploadVehicalDocs(data: FormData,j) {

  this._CabsNBusesService.uploadVehicalDocs(data).subscribe((res: any) => {
   
    if(j === this.vehicalDocs.length)
    {
      Swal.fire({
        title: res.title,
        text: res.message,
        type: res.type,
      }).then((result) => {
        if (res.status === 1) {
          this.uploader.clearQueue();
          this.getVehicalDetails(this.masterid);
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
          this.getVehicalDetails(this.masterid);
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
    this.vehicalDocs[index].tempfilename = event.target.files[0].name;

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (event: Event) => { // called once readAsDataURL is completed
      this.vehicalDocs[index].docimgtemp = event.currentTarget;
      this.vehicalDocs[index].docimgtemp = this.vehicalDocs[index].docimgtemp.result;
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

/* uploadVehicalImages(imagesupload)
{
 
  if (this.uploader.queue.length > 0) {
    for (let j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      data.append('file', fileItem);
      data.append('description',JSON.stringify({description:eval('imagesupload.value.description'+j) || null,vehicalid:this.vehicalDetails[0].id}));
      this.uploadImages(data,this.uploader.queue.length);
    }
  }
}
counter : number = 0;
uploadImages(formdata : FormData,imgslength)
{

    this._CabsNBusesService.uploadvehicalImages(formdata).subscribe((res: any) => {
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



uploadvahicalGalleryImage(vahicalDetails)
{

if(this.uploader.queue.length > 0 || (vahicalDetails.value.id != 0))
{

    // for (let j = 0; j < this.uploader.queue.length - 1; j++) {
      let data = new FormData();
      if(this.uploader.queue[this.uploader.queue.length - 1])
        var fileItem = this.uploader.queue[this.uploader.queue.length - 1]._file;
      data.append('file', fileItem);
      data.append('vahicalDetails', JSON.stringify(vahicalDetails.value));
      if(this.uploader.queue[this.uploader.queue.length - 1])
      this.SavevahicalGalleryImages(data);
      else
      this.SavevahicalGalleryDetails(vahicalDetails.value);
    // }
  }
  else
  {
    this.toastr.warning('Warning', 'Please choose image before upload');
  }
}

SavevahicalGalleryImages(data: FormData) {
  this._CabsNBusesService.uploadvahicalImages(data).subscribe((res: any) => {
    this.getVehicalDetails(this.masterid);
    this.uploader.clearQueue();
  });
}

SavevahicalGalleryDetails(data) {
  this._CabsNBusesService.uploadvahicalImages(data).subscribe((res: any) => {
    this.getVehicalDetails(this.masterid);
  });
}


public onFileSelected(event: EventEmitter<File[]>) {
    
    let files = event;
    if (files) {
      for (let file in files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.vehicalGallery.push({id:0,vehicalid:this.masterid,coverpictemp:null,description:null});
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

  this._CabsNBusesService.RemovevahicalGalleryImage(imgdetails.id).subscribe((res:any)=>{
      Swal.fire({
        title: res.title,
        text: res.message,
        type: res.type,
      }).then((result) => {
        if (res.status === 1) {
  
        } else {
          this.getVehicalDetails(this.masterid);
         
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
    imgobj.coverpictemp= event.currentTarget;
    imgobj.coverpictemp = imgobj.coverpictemp.result;
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
