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
}
