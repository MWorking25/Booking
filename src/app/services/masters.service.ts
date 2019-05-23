import { Injectable } from '@angular/core';
import { Http ,Response , Headers} from '@angular/http';
import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
import "rxjs/add/operator/map";
@Injectable({
  providedIn: 'root'
})
export class MastersService {

  constructor(private http:HttpClient) { }

  getCountriesList(): Observable<any>
  {
        return this.http.get<any>('http://localhost:3800/api/unity/getCountryList',{ withCredentials: true }).pipe(map(data => {
        return data;
      }));
  }
  
  getStatesListOnCountry(countryid): Observable<any>
  {
        return this.http.get<any>('http://localhost:3800/api/unity/getStatesOnCountries/'+countryid,{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }

  getCitiesListOnState(stateid): Observable<any>
  {
        return this.http.get<any>('http://localhost:3800/api/unity/getCitiesOnStates/'+stateid,{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }

}
