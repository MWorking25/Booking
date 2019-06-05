import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/observable';
import Swal from 'sweetalert2';
import { FileUploader } from "ng2-file-upload";
import { MastersService } from '../../../services/masters.service';
import { HotelDetails } from '../../../interfaces/hotel-details';
import { HotelAminityTitle } from '../../../interfaces/hotel-aminity-title';
import { HotelSubaminities } from '../../../interfaces/hotel-subaminities';
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
  roomindex:any;

  hotelDetails:HotelDetails[]=[{id:0,name:null,addressline1:null,addressline2:null,email:null,mobile1:null,mobile2:null,landline1:null,landline2:null,website:null,area:null,city:null,state:null,country:null,checkin_time:null,checkout_time:null,description:null,status:0,created_by:null,created_date:null,bannerimg:null,gstin:null}];

  hotelRooms:HotelRooms[]=[{id:0,hotelid:null,room_type:null,capacity:null,description:null,discounted_price:null,price:null,rooms_count:null,createdby:null,createddate:null}];
  

  countries:Observable<any>;
  states:Observable<any>;
  cities:Observable<any>;
  areas:Observable<any>;

  constructor(private _MastersService : MastersService,private _hotelsService:HotelsService,private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    var hotelid = this.activatedRoute.snapshot.paramMap.get('id');
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
  this._hotelsService.getHotelDetails(hotelid).subscribe((res:any)=>{
    this.url = 'http://localhost:3800/unity/uploads/'+res.hoteldetails[0].bannerimg;
    this.getStatesOnCountry(res.hoteldetails[0].country);
    this.getCitiesOnSate(res.hoteldetails[0].state);
    this.getAreasOnCity(res.hoteldetails[0].city);
    this.hotelDetails = res.hoteldetails;
    this.hotelRooms = res.roomsdetails;
  });	
}


}
