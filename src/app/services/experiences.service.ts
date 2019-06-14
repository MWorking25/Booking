import { Injectable } from '@angular/core';
import { Http ,Response , Headers} from '@angular/http';
import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
import "rxjs/add/operator/map";
@Injectable({
  providedIn: 'root'
})
export class ExperiencesService {

  
  // serveruri = 'http://103.252.7.5:3800';
  serveruri = 'http://localhost:3800';

  constructor(private http:HttpClient) { }

  getCruzList(): Observable<any>
  {
        return this.http.get<any>(this.serveruri+'/api/unity/CruzsList/',{ withCredentials: true }).pipe(map(data => {
          return data;
        }));
  }

}
