import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/observable';
import Swal from 'sweetalert2';
import { FileUploader } from "ng2-file-upload";
import { ToastrService } from 'ngx-toastr';
import { ExperiencesService } from '../../../services/experiences.service';
import * as $ from 'jquery';
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
  aminityIndex= null;
  

  icons:any= [
    {display:"<h2 title='Room Service' class='icon icon-room-service'></h2>",value:"icon-room-service"},
    {display:"<h2 title='Hotel Service' class='icon icon-hotel-service'></h2>",value:"icon-hotel-service"},
    {display:"<h2 title='Receptionist' class='icon icon-girl'></h2>",value:"icon-girl"},
    {display:"<h2 title='Maid' class='icon icon-maid'></h2>",value:"icon-maid"},
    {display:"<h2 title='Valet' class='icon icon-valet'></h2>",value:"icon-valet"},
    {display:"<h2 title='Laundry Service' class='icon icon-laundry-service'></h2>",value:"icon-laundry-service"},
    {display:"<h2 title='TV' class='icon icon-television'></h2>",value:"icon-television"},
    {display:"<h2 title='Bar' class='icon icon-cocktail'></h2>",value:"icon-cocktail"},
    {display:"<h2 title='Restraurent' class='icon icon-fast-food'></h2>",value:"icon-fast-food"},
    {display:"<h2 title='Wifi' class='icon icon-wifi'></h2>",value:"icon-wifi"},
    {display:"<h2 title='Bed' class='icon icon-bed'></h2>",value:"icon-bed"},
    {display:"<h2 title='Bathrobe' class='icon icon-bathrobe'></h2>",value:"icon-bathrobe"},
    {display:"<h2 title='Elevator' class='icon icon-elevator'></h2>",value:"icon-elevator"},
    {display:"<h2 title='Boat' class='icon icon-boat'></h2>",value:"icon-boat"},
    {display:"<h2 title='DJ' class='icon icon-dj'></h2>",value:"icon-dj"},
    {display:"<h2 title='Park' class='icon icon-park-1'></h2>",value:"icon-park-1"},
    {display:"<h2 title='Garden' class='icon icon-park'></h2>",value:"icon-park"},
    {display:"<h2 title='Library' class='icon icon-book'></h2>",value:"icon-book"},
    {display:"<h2 title='Air Conditioner' class='icon icon-air-conditioner'></h2>",value:"icon-air-conditioner"},
    {display:"<h2 title='Gym' class='icon icon-gym'></h2>",value:"icon-gym"},
    {display:"<h2 title='Parking' class='icon icon-parking'></h2>",value:"icon-parking"},
    {display:"<h2 title='Menu' class='icon icon-menu'></h2>",value:"icon-menu"},
    {display:"<h2 title='Location' class='icon icon-location'></h2>",value:"icon-location"},
    {display:"<h2 title='CCTV' class='icon icon-cctv'></h2>",value:"icon-cctv"},
    {display:"<h2 title='Dry Cleaning' class='icon icon-hanger'></h2>",value:"icon-hanger"},];

  cruzDetails:any;
  cruzTimeslots:any;
  cruzServices:any ;
  cruzAminities:any;
  cruzGallery:any;

  constructor(private activatedRoute: ActivatedRoute, private _ExperiencesService : ExperiencesService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

    this.cruzDetails = [{id:0,name:null,description:null,price:null,discounted_price:null,igst:null,cgst:null,sgst:null,capacity:null,createdby:null}];

    this.cruzid = this.activatedRoute.snapshot.paramMap.get('id');

    this.cruzGallery =[{id:0,cruzeid:this.cruzDetails[0].id,tmpfilename:null,description:null}];

    if(this.cruzid > 0)
      {
        this.getCruzDetails(this.cruzid);
      }
      
  }


  
  isCollapsedGeneraldetails: boolean = false;
  isCollapsedServices: boolean = false;
  isCollapsedTimeSlots: boolean = false;
  isCollapsedGallery: boolean = false;
  isCollapsedAminities: boolean = false;

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }


  
  uploadGalleryImage(cuzeDetails)
  {
    if(this.uploader.queue.length > 0 || (cuzeDetails.value.id != 0))
    {
      // for (let j = 0; j < this.uploader.queue.length; j++) {
        let data = new FormData();
        if(this.uploader.queue[this.uploader.queue.length -1])
        var fileItem = this.uploader.queue[this.uploader.queue.length -1]._file;
        data.append('file', fileItem);
        data.append('cruzDetails', JSON.stringify(cuzeDetails.value));
        if(this.uploader.queue[this.uploader.queue.length -1])
        this.SaveGalleryImages(data);
        else
        this.SaveGallerDetails(cuzeDetails.value);
      // }
    }
    else
    {
      this.toastr.warning('Warning', 'Please choose image before upload');
    }
  }

  SaveGalleryImages(data: FormData) {
    this._ExperiencesService.uploadCruzImages(data).subscribe((res: any) => {
      this.getCruzDetails(this.cruzDetails[0].id);
      this.uploader.clearQueue();
    });
  }

  SaveGallerDetails(data) {
    this._ExperiencesService.uploadCruzImages(data).subscribe((res: any) => {
      this.getCruzDetails(this.cruzDetails[0].id);
    });
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
        this.router.navigate(['/experiences/cruzedetails', res.cruzid]);
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
      this.router.navigate(['/experiences/cruzedetails', res.cruzid]);
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

addNewAminity()
{
  if(this.cruzAminities.length > 0)
  {
     if(this.cruzAminities[this.cruzAminities.length -1].titlename != null && this.cruzAminities[this.cruzAminities.length -1].titlename != '') 
      {
        this.cruzAminities.push({id:0,cruzid:this.cruzid,titlename:null,description:null,icon:this.icons[0].value});
      }
  }
  else
  {
    this.cruzAminities.push({id:0,cruzid:this.cruzid,titlename:null,description:null,icon:this.icons[0].value});
  }
}

setIconForAminity(selectedIcon)
{
  this.cruzAminities[this.aminityIndex].icon = selectedIcon.value;
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




RemoveAminity(index)
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

    this.cruzAminities.splice(index,1);


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

SaveCruzAminities()
{
  this._ExperiencesService.SaveCruzAminities(this.cruzAminities).subscribe((res: any) => {
      
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


      this.cruzTimeslots =[{id:0,cruzeid:cruzid,timeslot:null,closingtime:null}];
      this.cruzServices =[{id:0,cruzid:cruzid,servicename:null,description:null}];
      this.cruzAminities=[{titlename:null,cruzid:cruzid,description:null,icon:this.icons[0].value}];
      this.cruzGallery =[{id:0,cruzeid:cruzid,tmpfilename:null,description:null}];

    this._ExperiencesService.getCruzDetails(cruzid).subscribe((res: any) => {
      if (res.status === 1) {
        
      } else {
        
        this.cruzDetails = res.cruzDetails;
        this.cruzServices = res.cruzServices;
        this.cruzTimeslots = res.cruzTimeslot;
        this.cruzGallery = res.cruzGalley;
        this.url = res.cruzDetails[0].tempcoverpic;
        if(res.cruzDetails[0].aminities && res.cruzDetails[0].aminities != '' && res.cruzDetails[0].aminities != null)
           this.cruzAminities= JSON.parse(res.cruzDetails[0].aminities);

           this.cruzGallery.push({id:0,cruzeid:cruzid,tmpfilename:null,description:null});
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

  VerifyCruzAminities()
  {
       var emptyfields = this.cruzAminities.filter((value,index)=>{
            return ((value.titlename == null || value.titlename == ''))
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
    
    this.cruzGallery = [];
      let files = event;
      if (files) {
        for (let file in files) {
          let reader = new FileReader();
          reader.onload = (e: any) => {
            this.cruzGallery.push({id:0,cruzeid:this.cruzid,tmpfilename:e.target.result,description:null});
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
 
    this._ExperiencesService.RemoveGalleryImage(imgdetails.id).subscribe((res:any)=>{
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
      imgobj.tmpfilename= event.currentTarget;
      imgobj.tmpfilename = imgobj.tmpfilename.result;
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
