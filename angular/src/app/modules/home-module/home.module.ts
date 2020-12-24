import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home.component";
import { HttpClientModule } from "@angular/common/http";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { httpInterceptProviders } from "src/app/_interceptors";
import { HttpService } from "@app/_services/http.service";
import { OrderService, ItemService, UserService } from "@app/_store/store";
import { StatsTileComponent } from "./_components/stats-tile/stats-tile.component";
import { OrdersComponent } from "./_components/orders/orders.component";
import { DashboardComponent } from "./_containers/dashboard/dashboard.component";
import { OrdersContainerComponent } from "./_containers/orders-container/orders-container.component";
import { CustomerContainerComponent } from "./_containers/customer-container/customer-container.component";
import { ItemsContainerComponent } from "./_containers/items-container/items-container.component";
import { NewOrderComponent } from "./_components/new-order/new-order.component";
import { ViewOrderComponent } from "./_components/view-order/view-order.component";
import { OrderListItemComponent } from "./_components/order-list-item/order-list-item.component";
import { ViewItemComponent } from "./_components/view-item/view-item.component";
import { NewItemComponent } from "./_components/new-item/new-item.component";
import { CategoryPipe } from "@app/_helpers/category.pipe";
import { SubCategoryPipe } from "@app/_helpers/sub-category.pipe";
import { MeasurementPipe } from "@app/_helpers/measurement.pipe";
import { ViewCustomerComponent } from './_components/view-customer/view-customer.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent, // sidebar and nav
    children: [
      { path: "", redirectTo: "dashboard" },
      { path: "dashboard", component: DashboardComponent },
      { path: "orders", component: OrdersContainerComponent },
      { path: "orders/new", component: NewOrderComponent },
      { path: "orders/view/:id", component: ViewOrderComponent },
      { path: "items", component: ItemsContainerComponent },
      { path: "items/new", component: NewItemComponent },
      { path: "items/view/:id", component: ViewItemComponent },
      { path: "customers", component: CustomerContainerComponent },
      { path: "customers/view/:id", component: ViewCustomerComponent },
    ],
  },
];

@NgModule({
  declarations: [
    HomeComponent,
    StatsTileComponent,
    OrdersComponent,
    DashboardComponent,
    OrdersContainerComponent,
    CustomerContainerComponent,
    ItemsContainerComponent,
    NewOrderComponent,
    ViewOrderComponent,
    OrderListItemComponent,
    ViewItemComponent,
    NewItemComponent,
    CategoryPipe,
    SubCategoryPipe,
    MeasurementPipe,
    ViewCustomerComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    RouterModule.forChild(routes),
  ],
  providers: [
    httpInterceptProviders,
    MatDatepickerModule,
    OrderService,
    ItemService,
    UserService,
    HttpService,
  ],
})
export class HomeModule {}
