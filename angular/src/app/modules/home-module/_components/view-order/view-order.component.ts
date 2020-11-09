import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Order } from "@app/_models/order.model";
import { ActivatedRoute } from "@angular/router";
import {
  faChevronLeft,
  faSave,
  faPencilAlt,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import { HttpService } from "@app/_services/http.service";
import { Item } from "@app/_models/item.model";

@Component({
  selector: "app-view-order",
  templateUrl: "./view-order.component.html",
  styleUrls: ["./view-order.component.scss"]
})
export class ViewOrderComponent implements OnInit {
  public order: Order;
  public id: string;
  public faChevronLeft = faChevronLeft;
  public faSave = faSave;
  public faPencilAlt = faPencilAlt;
  public faTimes = faTimes;
  public isEditMode = false;
  public loading = false;
  public orderForm: FormGroup;
  public itemForm: FormGroup;
  public items: Item[] = [];
  public addedItems: Item[] = [];
  public selectedItem: Item;
  private _ORDER_LIMIT = 10;

  constructor(
    private _http: HttpService,
    private _fb: FormBuilder,
    private _router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._router.params.subscribe((param) => {
      this.id = param.id;
      this._getOrder(this.id);
    });

    this._getItems();
  }

  _getOrder(id: string) {
    this._http.get(`orders/${id}`).subscribe(
      (order: any) => {
        this.order = order;
        this.addedItems = [...this.order.items];
        this._generateForm();
      },
      (err) => console.log(err)
    );
  }

  _generateForm() {
    this.orderForm = this._fb.group({
      address: this._fb.group({
        delivery_date: this.order.delivery_date,
        line_1: this.order.address.line_1,
        line_2: this.order.address.line_2,
        city: this.order.address.city,
        state: this.order.address.state,
        phone: this.order.address.phone,
        pin: this.order.address.pin
      }),
      is_completed: this.order.is_completed,
      is_canceled: this.order.is_canceled
    });

    this.itemForm = this._fb.group({
      selected: ""
    });
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

  public edit() {
    this.isEditMode = true;
  }

  public cancel() {
    this.isEditMode = false;
  }

  public save() {
    let order: any;
    let delivery_date = new Date(this.orderForm.controls.address.value.delivery_date);
    order = {
      ...this.order,
      items: this.addedItems,
      ...this.orderForm.value,
      delivery_date
    };
    this._http.patch("order", order).subscribe(
      (res: any) => {
        console.log(res);
        this.order = { ...this.order, ...res.data };
        this.isEditMode = false;
        this.loading = true;
      },
      (err) => {
        console.log(err);
        this.isEditMode = false;
        this.loading = true;
      }
    );
  }
}
