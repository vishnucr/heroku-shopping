import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs'
import { URLService } from '../_services/url.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private _http: HttpClient, private _urlService: URLService) { }
  // get(url: string, options: { headers?: HttpHeaders | { [header: string]: string | string[]; }; observe: "response"; params?: HttpParams | { [param: string]: string | string[]; }; reportProgress?: boolean; responseType?: "json"; withCredentials?: boolean; }): Observable<HttpResponse<Object>>
  get(url: String, query?: String, options?: { headers?: HttpHeaders }): Observable<Object> {
    let urlString: string;

    query ? 
      urlString = `${this._urlService.getAPIURL()}/${url}?${query}`:
      urlString = `${this._urlService.getAPIURL()}/${url}`;

    const promise$ = this._http.get(urlString, options);
    
    return promise$;
  }

  post(url: String, body, options?: { headers?: HttpHeaders }): Observable<Object> {
    let urlString = `${this._urlService.getAPIURL()}/${url}`;
    const promise$ = this._http.post(urlString, body, options);
    
    return promise$;
  }

  patch(url: String, body, options?: { headers?: HttpHeaders }): Observable<Object> {
    let urlString = `${this._urlService.getAPIURL()}/${url}`;
    const promise$ = this._http.patch(urlString, body, options);
    
    return promise$;
  }
}