import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/observable';
import Swal from 'sweetalert2';
import { FileUploader } from "ng2-file-upload";
import { MastersService } from '../../../services/masters.service';
import { HotelDetails } from '../../../interfaces/hotel-details';
import { HotelAminityTitle } from '../../../interfaces/hotel-aminity-title';
import { HotelSubaminities } from '../../../interfaces/hotel-subaminities';
import { ToastrService } from 'ngx-toastr';
import { HotelRooms } from '../../../interfaces/hotel-rooms';
import { HotelsService } from '../../../services/hotels.service';
import $ from 'jquery';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @ViewChild('bannerImage')
  myInputVariable: ElementRef;

  url:any;
  htmlContent:any;
  hotelid:number;
  roomindex:any;
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



  hotelDetails:HotelDetails[]=[{id:0,name:null,addressline1:null,addressline2:null,email:null,mobile1:null,mobile2:null,landline1:null,landline2:null,website:null,area:null,city:null,state:null,country:null,checkin_time:null,checkout_time:null,description:null,status:0,created_by:null,created_date:null,bannerimg:null,gstin:null}];

  hotelRooms:HotelRooms[]=[{id:0,hotelid:null,room_type:null,capacity:null,description:null,discounted_price:null,price:null,rooms_count:null,createdby:null,createddate:null}];
  
  hotelAminities:any;

  countries:Observable<any>;
  states:Observable<any>;
  cities:Observable<any>;
  areas:Observable<any>;
  hotelGallery:any[]; 

  constructor(private _MastersService : MastersService,private _hotelsService:HotelsService,private activatedRoute: ActivatedRoute, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {

    var hotelid = this.activatedRoute.snapshot.paramMap.get('id');
    this.hotelid = parseInt(hotelid);
    this.getHotelDetails(hotelid);
    this.getCountriesList();
  
  }

  public uploader: FileUploader = new FileUploader({
    isHTML5: true
  });

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


  isCollapsedGeneraldetails: boolean = false;
  isCollapsedrooms: boolean = false;
  isCollapsedAminities: boolean = false;
  isCollapsedGallery: boolean = false;
  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
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

getAreasOnCity(cityid)
{ 
  this._MastersService.getAreasOnCity(cityid).subscribe((res:any)=>{
    this.areas = res;
  });	
}


setIconForAminity(selectedIcon)
{
  this.hotelAminities[this.aminityIndex].icon = selectedIcon.value;
}

addNewAminity()
{
  if(this.hotelAminities.length > 0)
  {
     if(this.hotelAminities[this.hotelAminities.length -1].titlename != null && this.hotelAminities[this.hotelAminities.length -1].titlename != '') 
      {
        this.hotelAminities.push({id:0,hotelid:this.hotelid,titlename:null,description:null,icon:this.icons[0].value});
      }
  }
  else
  {
    this.hotelAminities.push({id:0,hotelid:this.hotelid,titlename:null,description:null,icon:this.icons[0].value});
  }
}

addNewRoom()
{
  if(this.hotelRooms.length > 0)
  {
     if(this.hotelRooms[this.hotelRooms.length -1].room_type != null && this.hotelRooms[this.hotelRooms.length -1].price != null && this.hotelRooms[this.hotelRooms.length -1].rooms_count != null) 
      {
        this.hotelRooms.push({id:0,hotelid:this.hotelDetails[0].id,room_type:null,capacity:null,description:null,discounted_price:null,price:null,rooms_count:null,createdby:null,createddate:null});
      }
  }
  else
  {
    this.hotelRooms.push({id:0,hotelid:this.hotelDetails[0].id,room_type:null,capacity:null,description:null,discounted_price:null,price:null,rooms_count:null,createdby:null,createddate:null});
  }
}

RemoveRoom(roomdetails,index)
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
  if(roomdetails.id === 0)
  {
    this.hotelRooms.splice(index,1);
  }
  else
  {
    this._hotelsService.deleteRoomDetails(roomdetails.id).subscribe((res:any)=>{
        Swal.fire({
          title: res.title,
          text: res.message,
          type: res.type,
        }).then((result) => {
          if (res.status === 1) {
    
          } else {
            this.getHotelDetails(roomdetails.hotelid);
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

    this.hotelAminities.splice(index,1);


} else if (result.dismiss === Swal.DismissReason.cancel) {
  Swal.fire(
    'Cancelled',
    'Your imaginary file is safe :)',
    'error'
  )
}
})
}


VerifyForm()
{
  if(this.hotelDetails[0].name != null && this.hotelDetails[0].addressline1 != null && this.hotelDetails[0].email != null && this.hotelDetails[0].mobile1 != null && this.hotelDetails[0].state != null && this.hotelDetails[0].country != null)
  {
    return false;
  }
  else{
    return true;
  }
}

VerifyHotelAminities()
{
     var emptyfields = this.hotelAminities.filter((value,index)=>{
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

VerifyHotelRooms()
{


    var roomsfilters = this.hotelRooms.filter((value)=>{
        return (value.room_type == null || value.price == null || value.rooms_count == null)
    });

    if(roomsfilters.length > 0)
    {
      return true;
    }
    else{
      return false;
    }
}
saveHotelDetails(hoteldetails)
{
  if (this.uploader.queue.length > 0) {
    for (let j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      let fileItem = this.uploader.queue[j]._file;
      data.append('file', fileItem);
      data.append('hoteldetails', JSON.stringify(hoteldetails.value));
      this.uploadFile(data);
    }
  } else {
    this.saveHoteldetailasWithoutPic(hoteldetails.value);
  }
}

uploadFile(data: FormData) {

  this._hotelsService.SaveHotelDetails(data).subscribe((res: any) => {
    if(res.hotelid > 0) 
    {
      this.hotelDetails[0].id = res.hotelid;
      this.hotelRooms[0].hotelid = res.hotelid;
    }

    Swal.fire({
      title: res.title,
      text: res.message,
      type: res.type,
    }).then((result) => {
      if (res.status === 1) {

      } else {
        this.getHotelDetails(res.hotelid);
        this.hotelid = res.hotelid;
        this.router.navigate(['/hotels/details', res.hotelid]);
      }
    });
  });
}

saveHoteldetailasWithoutPic(hoteldetails)
{
  this._hotelsService.SaveHotelDetails(hoteldetails).subscribe((res: any) => {
    if(res.hotelid > 0) 
    {
      this.hotelDetails[0].id = res.hotelid;
      this.hotelRooms[0].hotelid = res.hotelid;
    }

    Swal.fire({
      title: res.title,
      text: res.message,
      type: res.type,
    }).then((result) => {
      if (res.status === 1) {

      } else {
        this.getHotelDetails(res.hotelid);
        this.hotelid = res.hotelid;
        this.router.navigate(['/hotels/details', res.hotelid]);
      }
    });
  });
}


SavehotelAminities()
{
  this._hotelsService.SavehotelAminities(this.hotelAminities).subscribe((res: any) => {
      
    Swal.fire({
      title: res.title,
      text: res.message,
      type: res.type,
    }).then((result) => {
      if (res.status === 1) {

      } else {
        this.getHotelDetails(this.hotelid);
      }
    });
  });
}


SaveHotelRoomDetails()
{
  this._hotelsService.SaveHotelRoomDetails(this.hotelRooms).subscribe((res: any) => {
    Swal.fire({
      title: res.title,
      text: res.message,
      type: res.type,
    }).then((result) => {
      if (res.status === 1) {

      } else {
        this.getHotelDetails(res.hotelid);
      }
    });
  });
}

setTextinEditor(descriptiontxt,index)
{
  this.htmlContent = descriptiontxt;
  this.roomindex = index;
}

RevertEditedText()
{
  this.hotelRooms[this.roomindex].description = this.htmlContent;
}



getHotelDetails(hotelid)
{ 
  this.hotelAminities = [{id:0,hotelid:hotelid,titlename:null,description:null,icon:this.icons[0].value}];
  this.hotelGallery = [{id:0,hotelid:hotelid,roomid:0,tmpfilename:null,description:null}];
  this._hotelsService.getHotelDetails(hotelid).subscribe((res:any)=>{
    if(res.hoteldetails.length > 0)
    {
      this.url = 'http://localhost:3800/unity/uploads/'+res.hoteldetails[0].bannerimg;
      this.getStatesOnCountry(res.hoteldetails[0].country);
      this.getCitiesOnSate(res.hoteldetails[0].state);
      this.getAreasOnCity(res.hoteldetails[0].city);
      this.hotelDetails = res.hoteldetails;
      this.hotelRooms = res.roomsdetails;
      this.hotelGallery = res.hotelPics;
      if(res.hoteldetails[0].aminities && res.hoteldetails[0].aminities!= '' && res.hoteldetails[0].aminities != null)
        this.hotelAminities = JSON.parse(res.hoteldetails[0].aminities);

        this.hotelGallery.push({id:0,hotelid:hotelid,roomid:0,tmpfilename:null,description:null});

    }
  });	
}


uploadHotelGalleryImage(hotelDetails)
{
  if(this.uploader.queue.length > 0 || (hotelDetails.value.id != 0))
  {
  
    // for (let j = 0; j < this.uploader.queue.length; j++) {
      let data = new FormData();
      if(this.uploader.queue[this.uploader.queue.length -1])
      var fileItem = this.uploader.queue[this.uploader.queue.length -1]._file;
      data.append('file', fileItem);
      data.append('hotelDetails', JSON.stringify(hotelDetails.value));
      if(this.uploader.queue[this.uploader.queue.length -1])
      this.SaveHotelGalleryImages(data);
      else
      this.SaveHotelGalleryDetails(hotelDetails.value);
    // }
  }
  else
  {
    this.toastr.warning('Warning', 'Please choose image before upload');
  }
}

SaveHotelGalleryImages(data: FormData) {
  this._hotelsService.uploadHotelImages(data).subscribe((res: any) => {
    this.getHotelDetails(this.hotelDetails[0].id);
    this.uploader.clearQueue();
  });
}

SaveHotelGalleryDetails(data) {
  this._hotelsService.uploadHotelImages(data).subscribe((res: any) => {
    this.getHotelDetails(this.hotelDetails[0].id);
  });
}


public onFileSelected(event: EventEmitter<File[]>) {
    
  this.hotelGallery = [];
    let files = event;
    if (files) {
      for (let file in files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.hotelGallery.push({id:0,hotelid:this.hotelid,roomid:0,tmpfilename:e.target.result,description:null});
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

  this._hotelsService.RemoveHotelGalleryImage(imgdetails.id).subscribe((res:any)=>{
      Swal.fire({
        title: res.title,
        text: res.message,
        type: res.type,
      }).then((result) => {
        if (res.status === 1) {
  
        } else {
          this.getHotelDetails(this.hotelid);
         
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


previewDocument(imgforPreview)
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
