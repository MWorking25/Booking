import { Injectable } from '@angular/core';
import { Http ,Response , Headers} from '@angular/http';
import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';
import { AppGlobals } from './credencials';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
import "rxjs/add/operator/map";
@Injectable({
  providedIn: 'root'
})
export class MastersService {


  constructor(private http:HttpClient,private _global: AppGlobals) { }

  serveruri = this._global.ApiLink;


  getCountriesList(): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/getCountryList',{ withCredentials: true }).pipe(map(data => {
        return data;
      }));
  }
  
  getStatesListOnCountry(countryid): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/getStatesOnCountries/'+countryid,{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }

  getCitiesListOnState(stateid): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/getCitiesOnStates/'+stateid,{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }

  getAreasOnCity(cityid): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/getAreasOnCity/'+cityid,{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }

  getAreaslist(): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/getAreaslist/',{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }

  SaveAreaDetails(areadetails): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/saveAreadetails/',areadetails,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));	
  }

  DeleteAreaDetails(areadetails): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/DeleteAreadetails/',areadetails,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));	
  }

 

  SaveUserDetails(userDetails): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/saveUserDetails/',userDetails,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));	
  }
  SaveUserDetailsWIthoutPic(userDetails): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/SaveUserDetailsWIthoutPic/',userDetails,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));	
  }


  getUsersList(): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/getUsersList/',{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }

  getAmintiesListList(): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/getAmintiesListList/',{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }

  getAminityDetails(aminityid): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/getAmintiesDetails/'+aminityid,{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }

  DeleteUsersDetails(usersdetails): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/DeleteUsersDetails/',usersdetails,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));	
  }

  SaveAminityDetails(aminitydetails): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/SaveAminityDetails/',aminitydetails,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));	
  }

  DeleteAminityDetails(aminitydetails): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/DeleteAminityDetails/',aminitydetails,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));	
  }

}
