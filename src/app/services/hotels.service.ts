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
export class HotelsService {

  constructor(private http:HttpClient,private _global: AppGlobals) { }

  serveruri = this._global.ApiLink;

  SaveHotelDetails(hoteldetails): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/SaveHotelDetails/',hoteldetails,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));
  }

  SaveHotelRoomDetails(hotelRoomdetails): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/SaveHotelRoomDetails/',hotelRoomdetails,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));
  }

  SavehotelAminities(hotelAminities): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/SavehotelAminities/',hotelAminities,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));
  }

  DeleteHotelDetails(hotelids): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/DeleteHotelDetails/',hotelids,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));
  }

  deleteRoomDetails(roomid): Observable<any>
  {
    return this.http.get<any>(this.serveruri+'/api/unity/deleteRoomDetails/'+roomid,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));
  }

  getHotelsList(): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/HotelsList/',{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }

  getHotelDetails(hotelid): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/getHotelDetails/'+hotelid,{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }



  RemoveHotelGalleryImage(imgid): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/RemoveHotelGalleryImage/'+imgid,{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }
 

  uploadHotelImages(hotelGalleryImages): Observable<any>
  {
    return this.http.post(this.serveruri+'/api/unity/uploadHotelImages/',hotelGalleryImages,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));
  }
}
