import { Component, Input } from "@angular/core";
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

@Component({
  selector: "app-order-list-item",
  templateUrl: "./order-list-item.component.html",
  styleUrls: ["./order-list-item.component.scss"]
})
export class OrderListItemComponent{
  @Input() public order: Order;
  @Input() public index: number;
  faClock = faClock;
  faBan = faBan;
  faCheck = faCheckCircle;
  faCart = faCartArrowDown;
  faEnvelope = faEnvelope;
  faPhone = faPhone;
  faFile = faFile;

}
