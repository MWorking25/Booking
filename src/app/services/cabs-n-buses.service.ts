import { Injectable } from '@angular/core';
import { Http ,Response , Headers} from '@angular/http';
import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
import "rxjs/add/operator/map";

@Injectable({
  providedIn: 'root'
})
export class CabsNBusesService {

    // serveruri = 'http://103.252.7.5:3800';
    serveruri = 'http://localhost:3800';

  constructor(private http:HttpClient) { }

  getVehicalsListList(): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/getVehicalsListList',{ withCredentials: true }).pipe(map(data => {
        return data;
      }));
  }

  deleteVehicalDocDetails(docid): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/deleteVehicalDocDetails/'+docid,{ withCredentials: true }).pipe(map(data => {
        return data;
      }));
  }

  getVehicalDetails(vehicalid): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/getVehicalDetails/'+vehicalid,{ withCredentials: true }).pipe(map(data => {
        return data;
      }));
  }


  saveVehicalDetails(vehicalDetails): Observable<any>
  {
        return this.http.post(this.serveruri+'/api/unity/saveVehicalDetails',vehicalDetails,{ withCredentials: true }).pipe(map(data => {
        return data;
      }));
  }

  uploadVehicalDocs(vehicalDetails): Observable<any>
  {
        return this.http.post(this.serveruri+'/api/unity/uploadVehicalDocs',vehicalDetails,{ withCredentials: true }).pipe(map(data => {
        return data;
      }));
  }

  uploadDocsWithoutpic(vehicalDetails): Observable<any>
  {
        return this.http.post(this.serveruri+'/api/unity/uploadVehicalDocs',vehicalDetails,{ withCredentials: true }).pipe(map(data => {
        return data;
      }));
  }

  uploadvehicalImages(vehicalDetails): Observable<any>
  {
        return this.http.post(this.serveruri+'/api/unity/uploadvehicalImages',vehicalDetails,{ withCredentials: true }).pipe(map(data => {
        return data;
      }));
  }

}
