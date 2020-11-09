import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { AuthService } from '../_services/auth.service';

@Injectable({providedIn:'root'})
export class AuthGuard {

  constructor( private _authService : AuthService, private _router : Router ) {
  }

  canActivate( route : ActivatedRouteSnapshot, state : RouterStateSnapshot ) {
    if(this._authService.isLoggedIn()) return true;
    // else navigate to login
    this._router.navigate(['/auth'])
  }
}