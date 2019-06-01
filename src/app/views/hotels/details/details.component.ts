import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { MastersService } from '../../../services/masters.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  hotelDetails:any=[{countryid:0,stateid:0,cityid:0}];
  countries:Observable<any>;
  states:Observable<any>;
  cities:Observable<any>;
  areas:Observable<any>;

  constructor(private _MastersService : MastersService,) { }

  ngOnInit() {
    this.getCountriesList();
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

}
