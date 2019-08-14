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
export class CabsNBusesService {

  constructor(private http:HttpClient,private _global: AppGlobals) { }

  serveruri = this._global.ApiLink;

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

  


  RemovevahicalGalleryImage(imgid): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/RemovevahicalGalleryImage/'+imgid,{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }
 

  uploadvahicalImages(vahicalGalleryImages): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/uploadvahicalImages/',vahicalGalleryImages,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));
  }


  getcabsList(): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/getcabsList',{ withCredentials: true }).pipe(map(data => {
        return data;
      }));
  }

  deleteCabDetails(cabids): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/deleteCabDetails/',cabids,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));
  }

  deletecabDocDetails(docid): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/deletecabDocDetails/'+docid,{ withCredentials: true }).pipe(map(data => {
        return data;
      }));
  }

  getcabDetails(cabid): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/getcabDetails/'+cabid,{ withCredentials: true }).pipe(map(data => {
        return data;
      }));
  }


  savecabDetails(vehicalDetails): Observable<any>
  {
        return this.http.post(this.serveruri+'/api/unity/savecabDetails',vehicalDetails,{ withCredentials: true }).pipe(map(data => {
        return data;
      }));
  }

  uploadcabDocs(vehicalDetails): Observable<any>
  {
        return this.http.post(this.serveruri+'/api/unity/uploadcabDocs',vehicalDetails,{ withCredentials: true }).pipe(map(data => {
        return data;
      }));
  }

  RemoveCabGalleryImage(imgid): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/RemoveCabGalleryImage/'+imgid,{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }
 

  uploadcabImages(cabGalleryImages): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/uploadcabImages/',cabGalleryImages,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));
  }


}
