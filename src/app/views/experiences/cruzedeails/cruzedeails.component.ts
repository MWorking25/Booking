import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/observable';
import Swal from 'sweetalert2';
import { FileUploader } from "ng2-file-upload";
import { ExperiencesService } from '../../../services/experiences.service';
@Component({
  selector: 'app-cruzedeails',
  templateUrl: './cruzedeails.component.html',
  styleUrls: ['./cruzedeails.component.scss']
})
export class CruzedeailsComponent implements OnInit {

  @ViewChild('bannerImage')
  myInputVariable: ElementRef;

  cruzid:any = 0;
  url:any = '';
  urls:any;
  cruzDetails:any = [{id:0,name:null,description:null,price:null,discounted_price:null,igst:null,cgst:null,sgst:null,capacity:null,createdby:null}];
  cruzTimeslots:any =[{id:0,cruzeid:this.cruzid,timeslot:null,closingtime:null}];
  cruzServices:any =[{id:0,cruzid:this.cruzid,servicename:null,description:null}];
  cruzGallery:any =[{id:0,cruzeid:this.cruzid,tmpfilename:null,description:null}];

  constructor(private activatedRoute: ActivatedRoute, private _ExperiencesService : ExperiencesService) { }

  ngOnInit() {
    this.cruzid = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCruzDetails(this.cruzid);
  }


  
  isCollapsedGeneraldetails: boolean = false;
  isCollapsedServices: boolean = false;
  isCollapsedTimeSlots: boolean = false;
  isCollapsedGallery: boolean = false;

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }


  saveCruzDetails(cuzeDetails)
  {
    if (this.uploader.queue.length > 0) {
      for (let j = 0; j < this.uploader.queue.length; j++) {
        let data = new FormData();
        let fileItem = this.uploader.queue[j]._file;
        data.append('file', fileItem);
        data.append('cruzDetails', JSON.stringify(cuzeDetails.value));
        this.SaveCruzDetailsWithFile(data);
      }
    } else {
      this.saveCruzDetailsWithoutPic(cuzeDetails.value);
    }
  }



  SaveCruzDetailsWithFile(data: FormData) {

    this._ExperiencesService.SaveCruzDetails(data).subscribe((res: any) => {
      if(res.cruzid > 0) 
      {
        this.cruzDetails[0].id = res.cruzid;
      }
  
      Swal.fire({
        title: res.title,
        text: res.message,
        type: res.type,
      }).then((result) => {
        if (res.status === 1) {
  
        } else {
          this.getCruzDetails(res.cruzid);
          this.cruzTimeslots[0].cruzid = res.cruzid;
          this.cruzServices[0].cruzeid = res.cruzid;
        }
      });
    });
  }

  saveCruzDetailsWithoutPic(hoteldetails)
{
  this._ExperiencesService.SaveCruzDetails(hoteldetails).subscribe((res: any) => {
    if(res.cruzid > 0) 
    {
      this.cruzDetails[0].id = res.cruzid;
    }

    Swal.fire({
      title: res.title,
      text: res.message,
      type: res.type,
    }).then((result) => {
      if (res.status === 1) {

      } else {
        this.getCruzDetails(res.cruzid);
        this.cruzTimeslots[0].cruzid = res.cruzid;
        this.cruzServices[0].cruzeid = res.cruzid;
      }
    });
  });
}




addNewService()
{
  if(this.cruzServices.length > 0)
  {
     if(this.cruzServices[this.cruzServices.length -1].servicename != null && this.cruzServices[this.cruzServices.length -1].servicename != '') 
      {
        this.cruzServices.push({id:0,cruzid:this.cruzDetails[0].id,servicename:null,description:null});
      }
  }
  else
  {
    this.cruzServices.push({id:0,cruzid:this.cruzDetails[0].id,servicename:null,description:null});
  }
}


addNewTimeSlot()
{
  if(this.cruzTimeslots.length > 0)
  {
     if(this.cruzTimeslots[this.cruzTimeslots.length -1].timeslot != null && this.cruzTimeslots[this.cruzTimeslots.length -1].timeslot != '' && this.cruzTimeslots[this.cruzTimeslots.length -1].closingtime != null && this.cruzTimeslots[this.cruzTimeslots.length -1].closingtime != '') 
      {
        this.cruzTimeslots.push({id:0,cruzeid:this.cruzid,timeslot:null,closingtime:null});
      }
  }
  else
  {
    this.cruzTimeslots.push({id:0,cruzeid:this.cruzid,timeslot:null,closingtime:null});
  }
}

RemoveService(servicesdetails,index)
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
  if(servicesdetails.id === 0)
  {
    this.cruzServices.splice(index,1);
  }
  else
  {
    this._ExperiencesService.deleteCruzServiceDetails(servicesdetails.id).subscribe((res:any)=>{
        Swal.fire({
          title: res.title,
          text: res.message,
          type: res.type,
        }).then((result) => {
          if (res.status === 1) {
    
          } else {
            this.getCruzDetails(servicesdetails.cruzid);
           
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

RemoveTimeSlot(timeSlots,index)
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
  if(timeSlots.id === 0)
  {
    this.cruzTimeslots.splice(index,1);
  }
  else
  {
    this._ExperiencesService.deleteCruzTimeSlotsDetails(timeSlots.id).subscribe((res:any)=>{
        Swal.fire({
          title: res.title,
          text: res.message,
          type: res.type,
        }).then((result) => {
          if (res.status === 1) {
    
          } else {
            this.getCruzDetails(this.cruzid);
           
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

SaveCruzTimeSlotsDetails()
{
  this._ExperiencesService.SaveCruzTimeSlotsDetails(this.cruzTimeslots).subscribe((res: any) => {
      
    Swal.fire({
      title: res.title,
      text: res.message,
      type: res.type,
    }).then((result) => {
      if (res.status === 1) {

      } else {
        this.getCruzDetails(this.cruzid);
      }
    });
  });
}



  getCruzDetails(cruzid)
  {
    this._ExperiencesService.getCruzDetails(cruzid).subscribe((res: any) => {
      if (res.status === 1) {
        
      } else {

        this.cruzDetails = res.cruzDetails;
        this.cruzServices = res.cruzServices;
        this.cruzTimeslots = res.cruzTimeslot;
        this.cruzGallery = res.cruzGalley;
        this.urls = res.cruzGalley;
      }
    });
  }


  resetImage() {
    this.myInputVariable.nativeElement.value = "";
    this.url = ''
    this.uploader.clearQueue();
  }
  
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

  SaveCruzServicesDetails()
  {
    this._ExperiencesService.SaveCruzServicesDetails(this.cruzServices).subscribe((res: any) => {
      
      Swal.fire({
        title: res.title,
        text: res.message,
        type: res.type,
      }).then((result) => {
        if (res.status === 1) {
  
        } else {
          this.getCruzDetails(this.cruzid);
          this.cruzTimeslots[0].cruzid = this.cruzid;
          this.cruzServices[0].cruzeid = this.cruzid;
        }
      });
    });
  }

  VerifyCruzServices()
  {
       var emptyfields = this.cruzServices.filter((value,index)=>{
            return (value.servicename == null || value.servicename == '')
       });
       if(emptyfields.length > 0)
       {
          return true
       }
       else{
         return false;
       }
  } 

  VerifyCruzTimeSlots()
  {
       var emptyfields = this.cruzTimeslots.filter((value,index)=>{
            return ((value.timeslot == null || value.timeslot == '') && (value.closingtime == null || value.closingtime == ''))
       });
       if(emptyfields.length > 0)
       {
          return true
       }
       else{
         return false;
       }
  } 
  
  VerifyCruzForm()
  {
    if(this.cruzDetails[0].name != null && this.cruzDetails[0].price != null && this.cruzDetails[0].capacity != null)
  {
    return false;
  }
  else{
    return true;
  }
  };
  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });


  public onFileSelected(event: EventEmitter<File[]>) {
    
    this.urls = [];
      let files = event;
      if (files) {
        for (let file in files) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.urls.push({tmpfilename:e.target.result});
          }
          reader.readAsDataURL(files[file]);
        }
      }
  }


  uploadCruzImages(imagesupload)
{
 
  if (this.uploader.queue.length > 0) {
    for (let j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      data.append('file', fileItem);
      data.append('description',JSON.stringify({description:eval('imagesupload.value.description'+j) || null,cruzid:this.cruzid}));
      this.uploadImages(data,this.uploader.queue.length);
    }
  }
}
counter : number = 0;
uploadImages(formdata : FormData,imgslength)
{

    this._ExperiencesService.uploadCruzImages(formdata).subscribe((res: any) => {
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
}

}
