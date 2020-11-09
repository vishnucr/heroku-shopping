import { Component, OnInit } from "@angular/core";
import { AlertService } from "src/app/_services/alert.service";
import { AuthService } from "src/app/_services/auth.service";
import { HttpService } from "@app/_services/http.service";
import { Order } from "@app/_models/order.model";
import { Item } from "@app/_models/item.model";
import { User } from "@app/_models/user.model";
import { OrderService, ItemService, UserService } from "@app/_store/store";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  isMenuOpen = false;
  initialLoading = true;
  constructor(
    private _alertService: AlertService,
    private _authService: AuthService,
    private _http: HttpService,
    private _orderStore: OrderService,
    private _itemStore: ItemService,
    private _userStore: UserService
  ) {}

  ngOnInit(): void {
    // Alert Constant
    const options = {
      id: "default-alert",
      keepAfterRouteChange: false,
      autoClose: true
    };
    // Firing a Toaster
    this._alertService.success("Home Loaded", options);
    
    // Adding store items from http call
    this._getOrders();
    this._getItems();
    this._getUsers();
  }

  sync(){
    this._clearStore();
    this._orderStore.sync();
    this._itemStore.sync();
    this._userStore.sync();
  }

  _getOrders() {
    this._http.get("orders").subscribe(
      (res: Order[]) => {
        this._orderStore.addMany(res);
      },
      (err) => console.error(err)
    );
  }

  _getUsers() {
    this._http.get("items").subscribe(
      (res: Item[]) => {
        this._itemStore.addMany(res);
      },
      (err) => console.error(err)
    );
  }

  _getItems() {
    this._http.get("users").subscribe(
      (res: User[]) => {
        this._userStore.addMany(res);
      },
      (err) => console.error(err)
    );
  }

  toggleMenu() {
    this.initialLoading = false;
    this.isMenuOpen = !this.isMenuOpen;
  }

  _clearStore(){
    this._orderStore.clear();
    this._itemStore.clear();
    this._userStore.clear();
  }

  logout() {
    this._clearStore();
    this._authService.logout();
  }
}
