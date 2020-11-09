import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from 'src/app/_models/alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private $subject = new Subject<Alert>();
    private _defaultId = 'default-alert'; // coming from alert.component.ts

    //  subscribed on alert components
    onAlert(id = this._defaultId): Observable<Alert> {
        // subject is sent as observable to Alert Component
        return this.$subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    // convenience methods
    // options = { id: 'default-alert', some_value: 10...}
    success(message: string, options?: any) { 
        this.alert(new Alert({ ...options, type: AlertType.Success, message }));
    }

    error(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Error, message }));
    }

    info(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Info, message }));
    }

    warn(message: string, options?: any) {
        this.alert(new Alert({ ...options, type: AlertType.Warning, message }));
    }

    // main alert method    
    alert(alert: Alert) {
        alert.id = alert.id || this._defaultId;
        // pushing newly generated alert to components via observable
        this.$subject.next(alert);
    }

    // clear alerts
    clear(id = this._defaultId) {
        this.$subject.next(new Alert({ id }));
    }
}