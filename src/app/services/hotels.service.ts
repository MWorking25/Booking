import { Injectable } from '@angular/core';
import { Http ,Response , Headers} from '@angular/http';
import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
import "rxjs/add/operator/map";
@Injectable({
  providedIn: 'root'
})
export class HotelsService {

  constructor(private http:HttpClient) { }



  SaveHotelDetails(hoteldetails): Observable<any>
  {
    return this.http.post('http://localhost:3800/api/unity/SaveHotelDetails/',hoteldetails,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));
  }

  SaveHotelRoomDetails(hotelRoomdetails): Observable<any>
  {
    return this.http.post('http://localhost:3800/api/unity/SaveHotelRoomDetails/',hotelRoomdetails,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));
  }

  DeleteHotelDetails(hotelids): Observable<any>
  {
    return this.http.post('http://localhost:3800/api/unity/DeleteHotelDetails/',hotelids,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));
  }

  deleteRoomDetails(roomid): Observable<any>
  {
    return this.http.get<any>('http://localhost:3800/api/unity/deleteRoomDetails/'+roomid,{ withCredentials: true }).pipe(map(data => {
							return data;
					}));
  }

  getHotelsList(): Observable<any>
  {
        return this.http.get<any>('http://localhost:3800/api/unity/HotelsList/',{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }

  getHotelDetails(hotelid): Observable<any>
  {
        return this.http.get<any>('http://localhost:3800/api/unity/getHotelDetails/'+hotelid,{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }
}
