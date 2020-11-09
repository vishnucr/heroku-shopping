import { ObservableStore } from "@codewithdan/observable-store";
import { ReduxDevToolsExtension } from "@codewithdan/observable-store-extensions";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { HttpService } from "@app/_services/http.service";
import { uniqBy } from "lodash";

import { OrderState } from "./store-model";
import { ItemState } from "./store-model";
import { UserState } from "./store-model";

import { Order } from "../_models/order.model";
import { Item } from "../_models/item.model";
import { User } from "../_models/user.model";

ObservableStore.globalSettings = {
  trackStateHistory: true,
  logStateChanges: true
};
ObservableStore.addExtension(new ReduxDevToolsExtension());

export enum OrdersStoreActions {
  AddOrder = "ADD_ORDER",
  AddManyOrder = "ADD_MANY_ORDER",
  RemoveOrder = "REMOVE_ORDER",
  ClearOrders = "CLEAR_ORDERS",
  GetOrders = "GET_ORDERS",
  SyncOrders = "SYNC_ORDERS"
}
export enum ItemsStoreActions {
  AddItem = "ADD_ITEM",
  AddManyItem = "ADD_MANY_ITEM",
  RemoveItem = "REMOVE_ITEM",
  GetItems = "GET_ITEMS",
  SyncItems = "SYNC_ITEMS",
  ClearItems = "CLEAR_ITEMS",
}
export enum UsersStoreActions {
  AddUser = "ADD_USER",
  AddManyUser = "ADD_MANY_USER",
  RemoveUser = "REMOVE_USER",
  GetUsers = "GET_USERS",
  SyncUsers = "SYNC_USERS",
  ClearUsers = "CLEAR_USERS",
}

const orderState = {
  orders: [],
  order: null
};
const itemsState = {
  items: [],
  item: null
};
const usersState = {
  users: [],
  user: null
};

// ORDER STORE
@Injectable()
export class OrderService extends ObservableStore<OrderState> {
  constructor(private _http: HttpService) {
      super({ trackStateHistory: true });
      console.log("Order STORE");
      this.setState(orderState, "INIT_STATE");
  }

  get() {
    const orders = this.getState().orders;
    if (orders.length > 0) {
      return of(orders);
    } else {
      this._http.get("orders").subscribe(
        async (res: Order[]) => {
          return of(res);
        },
        (err) => console.error(err)
      );
    }
  }

  clear() {
    this.setState(orderState, "INIT_STATE");
  }

  sync(){
    this._http.get("orders").subscribe(
      (res: Order[]) => {
        this.setState({ orders: res }, OrdersStoreActions.SyncOrders);
      },
      (err) => console.error(err)
    );
  }

  add(order: Order) {
    let state = this.getState();
    state.orders.push(order);
    this.setState({ orders: state.orders }, OrdersStoreActions.AddOrder);
  }

  addMany(orders: Order[]) {
    let state = this.getState();
    state.orders = uniqBy([...state.orders, ...orders], "_id");
    this.setState({ orders: state.orders }, OrdersStoreActions.AddManyOrder);
  }

  remove(index) {
    let state = this.getState();
    state.orders.splice(index, 1);
    this.setState({ orders: state.orders }, OrdersStoreActions.RemoveOrder);
  }
}

// ITEM STORE
@Injectable()
export class ItemService extends ObservableStore<ItemState> {
  constructor(private _http: HttpService) {
    super({ trackStateHistory: true });
    this.setState(itemsState, "INIT_STATE");
  }

  get() {
    const items = this.getState().items;
    if (items.length > 0) {
      return of(items);
    } else {
      this._http.get("items").subscribe(
        async (res: Item[]) => {
          return of(res);
        },
        (err) => console.error(err)
      );
    }
  }

  clear() {
    this.setState(itemsState, "INIT_STATE");
  }

  sync(){
    this._http.get("items").subscribe(
      (res: Item[]) => {
        this.setState({ items: res }, ItemsStoreActions.SyncItems);
      },
      (err) => console.error(err)
    );
  }

  add(item: Item) {
    let state = this.getState();
    state.items.push(item);
    this.setState({ items: state.items }, ItemsStoreActions.AddItem);
  }

  addMany(items: Item[]) {
    let state = this.getState();
    state.items = uniqBy([...state.items, ...items], "_id");
    this.setState({ items: state.items }, ItemsStoreActions.AddManyItem);
  }

  remove(index) {
    let state = this.getState();
    state.items.splice(index, 1);
    this.setState({ items: state.items }, ItemsStoreActions.RemoveItem);
  }
}

// USER STORE
@Injectable()
export class UserService extends ObservableStore<UserState> {
  constructor(private _http: HttpService) {
    super({ trackStateHistory: true });
    this.setState(usersState, "INIT_STATE");
  }

  get() {
    const users = this.getState().users;
    if (users.length > 0) {
      return of(users);
    } else {
      this._http.get("users").subscribe(
        async (res: User[]) => {
          return of(res);
        },
        (err) => console.error(err)
      );
    }
  }

  sync(){
    this._http.get("users").subscribe(
      (res: User[]) => {
        this.setState({ users: res }, UsersStoreActions.SyncUsers);
      },
      (err) => console.error(err)
    );
  }

  clear() {
    this.setState(usersState, "INIT_STATE");
  }

  add(user: User) {
    let state = this.getState();
    state.users.push(user);
    this.setState({ users: state.users }, UsersStoreActions.AddUser);
  }

  addMany(users: User[]) {
    let state = this.getState();
    state.users = uniqBy([...state.users, ...users], "_id");
    this.setState({ users: state.users }, UsersStoreActions.AddManyUser);
  }

  remove(index) {
    let state = this.getState();
    state.users.splice(index, 1);
    this.setState({ users: state.users }, UsersStoreActions.RemoveUser);
  }
}
