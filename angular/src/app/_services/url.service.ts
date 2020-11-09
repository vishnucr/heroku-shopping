import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class URLService {
    getRootURL(): String {
        const URL = 'http://127.0.0.1:4000';
        return URL;
    }
    getAPIURL(): String {
        const URL = 'http://127.0.0.1:4000/api';
        return URL;
    }
}