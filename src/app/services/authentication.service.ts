import { Injectable } from '@angular/core';
import { Http ,Response , Headers} from '@angular/http';
import { HttpClient, HttpHeaders , HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/observable';
import "rxjs/add/operator/map";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http:HttpClient) { }

  Authenticateuser(userdetails): Observable<any>
  {
    return this.http.post('http://localhost:3800/api/unity/userAuth/bd83b23ue83b899e2383b2383n238/U889436',userdetails).pipe(map(data => {
							return data;
					}));	
  }

}
