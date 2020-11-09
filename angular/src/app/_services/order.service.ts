import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from '@app/_models/order.model';

@Injectable({providedIn: 'root'})
export class OrderService {

  private _orderSource$ = new BehaviorSubject(null);
  currentOrder$ = this._orderSource$.asObservable();

  constructor() { }

  selectOrder(order: Order) {
    this._orderSource$.next(order)
  }

}
