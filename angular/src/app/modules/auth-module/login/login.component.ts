import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpService } from '@app/_services/http.service';
import { AlertService } from '@app/_services/alert.service';

interface LoginResponse {
  message: string;
  success: boolean;
  payload?: {
    t: string,
    rt: string
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Init
  loginForm: FormGroup;
  url: String;
  // Getter
  get f() { return this.loginForm.controls }

  constructor(
    private _fb: FormBuilder,
    private _http: HttpService,
    private _router: Router,
    private _alertService: AlertService) { }

  login(e: Event) {
    e.preventDefault();
    const b64 = btoa(`${this.f.username.value}:${this.f.password.value}`)
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ${b64}`,
    })
    /**
      * @param {string} url - Login URL.
      * * @param {string} query - Query Params.
      * * @param {HttpHeaders} headers - HTTP Headers.
    */
    this._http.get(`login`, '', { headers })
      .subscribe((res: LoginResponse) => {
        if(res.success){
          localStorage.setItem('jwt_token', res.payload?.t);
          localStorage.setItem('jwt_rtoken', res.payload?.rt);
          this._router.navigate([''])
        } else {
          const options = {
            id: 'default-alert',
            keepAfterRouteChange: true,
            autoClose:true,
          }
          this._alertService.error('Invalid Login Credentials', options)
        }
      }, (err: HttpErrorResponse) => {
        alert(JSON.stringify(err));
      });
  }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
}
