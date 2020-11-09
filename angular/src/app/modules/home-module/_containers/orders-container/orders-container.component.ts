import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
// import { HttpService } from "@app/_services/http.service";
import { Order } from "@app/_models/order.model";
import { Item } from "@app/_models/item.model";
import { User } from "@app/_models/user.model";
import { OrderService, ItemService, UserService } from "@app/_store/store";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-orders-container",
  templateUrl: "./orders-container.component.html",
  styleUrls: ["./orders-container.component.scss"]
})
export class OrdersContainerComponent implements OnInit, OnDestroy {
  constructor(
    // private _http: HttpService,
    private _orderStore: OrderService,
    private _itemStore: ItemService,
    private _userStore: UserService
  ) {}

  private _orderStoreSubscription: Subscription;
  private _itemStoreSubscription: Subscription;
  private _userStoreSubscription: Subscription;
  public items: Item[] = [];
  public orders: Order[] = [];
  public pending_orders: Order[] = [];
  public completed_orders: Order[] = [];
  public new_orders: Order[] = [];
  public canceled_orders: Order[] = [];
  public users: User[] = [];
  public currentOrder: Order;
  public tab = "new"; // for orders list component
  public faPlus = faPlus;

  ngOnInit(): void {
    // Getting data from store
    this._getUsers();
    this._getItems();
    this._getOrders();
  }

  ngOnDestroy() {
    this._orderStoreSubscription.unsubscribe();
    this._itemStoreSubscription.unsubscribe();
    this._userStoreSubscription.unsubscribe();
  }

  _getUsers() {
    this._userStoreSubscription = this._userStore.stateChanged.subscribe(
      (state) => {
        if (state) {
          this.users = state.users;
        }
      }
    );
  }

  _getItems() {
    this._itemStoreSubscription = this._itemStore.stateChanged.subscribe(
      (state) => {
        if (state) {
          this.items = state.items;
        }
      }
    );
  }

  _getOrders() {
    this._orderStoreSubscription = this._orderStore.stateChanged.subscribe(
      (state) => {
        if (state) {
          this.orders = state.orders;
          this._sortOrders();
        }
      }
    );
  }

  // Sorting orders based on TABS in UI
  _sortOrders() {
    const today = new Date().getDate();
    this.orders.length === 0 &&
      ((this.completed_orders = []),
      (this.new_orders = []),
      (this.pending_orders = []),
      (this.canceled_orders = []));
    this.orders.forEach((order: Order) => {
      const order_date = new Date(order.date).getDate();
      // Completed or Pending
      order.is_completed && !order.is_canceled
        ? this.completed_orders.push(order)
        : this.pending_orders.push(order);
      // New Order
      order_date === today && !order.is_canceled && this.new_orders.push(order);
      // Canceled Order
      order.is_canceled && this.canceled_orders.push(order);
    });
  }
}
