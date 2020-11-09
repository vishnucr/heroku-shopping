import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { AlertService } from './alert.service';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(private _alertService: AlertService, private _router: Router,) { }
    isLoggedIn() {
        const token = localStorage.getItem('jwt_token');
        const decoded = token && jwt_decode(token); // null value returns out of function, hence failed navigation
        const time = Math.floor(Date.now() / 1000); // current time
        if (token === "undefined" || token === null || decoded?.exp < time) {
            const options = {
                id: 'default-alert',
                keepAfterRouteChange: true,
                autoClose: true,
            }
            token ? this._alertService.error('Token Expired', options) :
            this._alertService.error('Please login to continue...', options)
            return false
        } else return true
    }
    logout() {
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('jwt_rtoken');
        this._router.navigate(['/auth']);
    }
}