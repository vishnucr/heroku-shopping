import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from "@angular/core";
import { Order } from "@app/_models/order.model";
import {
  faClock,
  faFile,
  faBan,
  faCheckCircle,
  faCartArrowDown,
  faEnvelope,
  faPhone
} from "@fortawesome/free-solid-svg-icons";
// import { OrderService } from '@app/_services/order.service';

@Component({
  selector: "app-orders",
  templateUrl: "./orders.component.html",
  styleUrls: ["./orders.component.scss"]
})
export class OrdersComponent implements OnInit, OnChanges {
  @Input() pending: Order[];
  @Input() new: Order[];
  @Input() completed: Order[];
  @Input() canceled: Order[];
  @Input() active_tab: string;
  @Output() orderSelected = new EventEmitter();

  faClock = faClock;
  faBan = faBan;
  faCheck = faCheckCircle;
  faCart = faCartArrowDown;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faFile = faFile;

  constructor() {}


  ngOnInit(): void {
    // console.log(this.new, this.pending);
  }

  ngOnChanges(){
    // console.log(this.new, this.pending);
  }

  selectOrder(order: Order) {
    this.orderSelected.emit({ order: order, tab: this.active_tab });
  }

  changeTab(tab) {
    this.active_tab = tab;
  }
}
