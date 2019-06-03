import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/observable';
import Swal from 'sweetalert2';
import { FileUploader } from "ng2-file-upload";
import { MastersService } from '../../../services/masters.service';
import { HotelDetails } from '../../../interfaces/hotel-details';
import { HotelAminityTitle } from '../../../interfaces/hotel-aminity-title';
import { HotelSubaminities } from '../../../interfaces/hotel-subaminities';
import { HotelRooms } from '../../../interfaces/hotel-rooms';
import { HotelsService } from '../../../services/hotels.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @ViewChild('bannerImage')
  myInputVariable: ElementRef;

  url:any;
  hotelDetails:HotelDetails[]=[{id:0,name:null,addressline1:null,addressline2:null,email:null,mobile1:null,mobile2:null,landline1:null,landline2:null,website:null,area:null,city:null,state:null,country:null,checkin_time:null,checkout_time:null,description:null,status:0,created_by:null,created_date:null,bannerimg:null,gstin:null}];
  hotelRooms:any=[{id:null,room_type:null,rooms_count:null,description:null,price:null,discounted_price:null}];
  countries:Observable<any>;
  states:Observable<any>;
  cities:Observable<any>;
  areas:Observable<any>;

  constructor(private _MastersService : MastersService,private _hotelsService:HotelsService) { }

  ngOnInit() {
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
  isCollapsedContactdetails: boolean = false;
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
  this.hotelRooms.push({id:null,room_type:null,rooms_count:null,description:null,price:null,discounted_price:null});
}

RemoveRoom(roomdetails,index)
{
  if(roomdetails.id === null)
  {
    this.hotelRooms.splice(index,1);
  }
  else
  {

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
    Swal.fire({
      title: res.title,
      text: res.message,
      type: res.type,
    }).then((result) => {
      if (res.status === 1) {

      } else {
        location.reload();
      }
    });
  });
}

saveHoteldetailasWithoutPic(hoteldetails)
{
    console.log(hoteldetails)
}

}
