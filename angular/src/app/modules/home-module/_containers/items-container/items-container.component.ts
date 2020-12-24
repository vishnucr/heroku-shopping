import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
// import { HttpService } from "@app/_services/http.service";
import { Item } from "@app/_models/item.model";
import { ItemService } from "@app/_store/store";
import { faPlus, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-items-container",
  templateUrl: "./items-container.component.html",
  styleUrls: ["./items-container.component.scss"],
})
export class ItemsContainerComponent implements OnInit {
  constructor(
    // private _http: HttpService,
    private _router: Router,
    private _itemStore: ItemService,
  ) {}
  private _itemStoreSubscription: Subscription;
  public items: Item[] = [];
  public faPlus = faPlus;
  public faPencilAlt = faPencilAlt;

  ngOnInit(): void {
    this._getItems();
  }

  ngOnDestroy() {
    this._itemStoreSubscription.unsubscribe();
  }

  public edit(id) {
    this._router.navigateByUrl(`items/view/${id}`);
  }

  private _getItems() {
    this._itemStoreSubscription = this._itemStore.stateChanged.subscribe(
      (state) => {
        if (state) {
          this.items = state.items;
        }
      }
    );
  }
}
