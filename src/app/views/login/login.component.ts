import { Component,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder} from '@angular/forms';
import {Router} from "@angular/router"
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../../services/authentication.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{ 

  authentication_form : FormGroup;
  email:String;
  password:String;

  constructor(private http: HttpClient,private fb: FormBuilder, private _AuthenticationService : AuthenticationService, private cookieService: CookieService,private router: Router)
  {

  }
 
  ngOnInit()
  {

    this.authentication_form = this.fb.group({
      useremailCtrl: [this.email],
      passwordCtrl: [this.password]
    });

  }


  AuthenticateUser(authenticationForm)
  {
    this._AuthenticationService.Authenticateuser(authenticationForm.value).subscribe((res:any)=>{
      if(res.success ==true)
      {
        var keyNames = Object.keys(res);
        for(var i=0;i < keyNames.length;i++)
        {
            var keyValue = eval("res."+keyNames[i]);
            this.cookieService.set( keyNames[i], keyValue );
            if(i === keyNames.length -1)
            {
              this.router.navigate(['/dashboard'])
            }
        }
      }
      else{
        Swal.fire({
          text: res.message,
          type: 'error',
        }).then((result) => {
        });
      }
    });	 
  }

}
