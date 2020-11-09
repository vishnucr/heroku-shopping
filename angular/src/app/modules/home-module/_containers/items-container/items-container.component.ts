import { Component, OnInit } from '@angular/core';
import { HttpService } from '@app/_services/http.service';
import { Item } from '@app/_models/item.model';

@Component({
  selector: 'app-items-container',
  templateUrl: './items-container.component.html',
  styleUrls: ['./items-container.component.scss']
})
export class ItemsContainerComponent implements OnInit {

  constructor(private _http: HttpService) {
  }
  items: Item[] = [];

  ngOnInit(): void {
    this.getItems();
  }

  getItems() {
    this._http.get('items').subscribe((res: Item[]) => this.items = res, err => console.error(err));
  }


}
