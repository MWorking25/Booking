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
export class ExperiencesService {


  constructor(private http:HttpClient,private _global: AppGlobals) { }

  serveruri = this._global.ApiLink;

  getCruzList(): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/CruzsList/',{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }

  deleteCruzServiceDetails(serviceid): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/deleteCruzServiceDetails/'+serviceid,{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }

  getCruzDetails(cruzid): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/getCruzDetails/'+cruzid,{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }

  deleteCruzTimeSlotsDetails(timeslotid): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/deleteCruzTimeSlotsDetails/'+timeslotid,{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }

  RemoveGalleryImage(imgid): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/RemoveGalleryImage/'+imgid,{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }

  SaveCruzDetails(cruzDetails): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/SaveCruzDetails/',cruzDetails,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));
  }

  SaveCruzAminities(cruzAmintiesDetails): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/SaveCruzAminities/',cruzAmintiesDetails,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));
  }

  DeleteCruzDetails(cruzDetails): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/DeleteCruzDetails/',cruzDetails,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));
  }

  SaveCruzServicesDetails(cruzserviceDetails): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/SaveCruzServicesDetails/',cruzserviceDetails,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));
  }

  SaveCruzTimeSlotsDetails(cruzTimeSlotDetails): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/SaveCruzTimeSlotsDetails/',cruzTimeSlotDetails,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));
  }

  uploadCruzImages(cruzGalleryImages): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/uploadCruzImages/',cruzGalleryImages,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));
  }


}
