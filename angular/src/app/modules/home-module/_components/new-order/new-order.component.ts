import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import {
  faChevronLeft,
  faSave,
  faPencilAlt,
  faTimes,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import { HttpService } from "@app/_services/http.service";
import { Item } from "@app/_models/item.model";
import { User } from "@app/_models/user.model";
import { Order } from "@app/_models/order.model";
import { OrderService } from "@app/_store/store";
import env from "@app/_config/envirponment.dev";

@Component({
  selector: "app-new-order",
  templateUrl: "./new-order.component.html",
  styleUrls: ["./new-order.component.scss"]
})
export class NewOrderComponent implements OnInit {
  public faChevronLeft = faChevronLeft;
  public faSave = faSave;
  public faPencilAlt = faPencilAlt;
  public faPlus = faPlus;
  public faTimes = faTimes;
  public loading = false;
  public orderForm: FormGroup;
  public itemForm: FormGroup;
  public items: Item[] = [];
  public users: User[] = [];
  public addedItems: Item[] = [];
  public selectedItem: Item;
  private _ORDER_LIMIT = 10;
  public env = env;

  constructor(
    private _http: HttpService,
    private _fb: FormBuilder,
    private _router: Router,
    private _orderStore: OrderService
  ) {}

  ngOnInit(): void {
    this._generateForm();
    this._getItems();
    this._getUsers();
  }

  _getUsers() {
    this.loading = false;
    this._http.get(`users`).subscribe(
      (users: User[]) => {
        this.users = users;
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.loading = false;
      }
    );
  }

  _generateForm() {
    this.orderForm = this._fb.group({
      user: "",
      address: this._fb.group({
        delivery_date: "",
        line_1: "",
        line_2: "",
        city: "",
        state: "",
        phone: "",
        pin: ""
      }),
      is_completed: false,
      is_canceled: false
    });

    this.itemForm = this._fb.group({
      selected: ""
    });
  }

  public selectUser(e) {
    const _id = e.target.value;
    const user: any = Object.assign(
      {},
      this.users.find((user) => user._id === _id)
    );
    let { phone, address } = user;
    address = { ...address, phone, delivery_date: new Date() };
    delete address._id; // _id auto generated in db, not used here in form
    this.orderForm.setValue({ ...this.orderForm.value, address });
  }

  _getItems() {
    this.loading = true;
    this._http.get("items").subscribe(
      (res: Item[]) => {
        this.items = res;
        this.loading = false;
      },
      (err) => {
        console.error(err);
        this.loading = false;
      }
    );
  }

  public addItem() {
    console.log(this.orderForm.controls.address.value.delivery_date);
    const item_index = this.addedItems.map((item) => item._id);
    this.selectedItem = this.itemForm.value.selected;
    item_index.includes(this.selectedItem._id)
      ? this.addedItems.forEach((item) => {
          item._id === this.selectedItem._id &&
            item.quantity < this._ORDER_LIMIT &&
            item.quantity++;
        })
      : this.addedItems.push(this.selectedItem);
  }

  public removeItem(index) {
    this.addedItems.splice(index, 1);
  }

  public save() {
    let delivery_date = new Date(
      this.orderForm.controls.address.value.delivery_date
    );
    let date = new Date();
    const order = {
      ...this.orderForm.value,
      items: this.addedItems,
      delivery_date,
      date
    };
    this._http.post("order", order).subscribe(
      (res: any) => {
        this._orderStore.add(res.data);
        this._router.navigate(["orders"]);
      },
      (err) => console.log(err)
    );
  }

  public cancel() {
    this._router.navigate(["orders"]);
  }
}
