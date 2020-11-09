import { Component, OnInit } from '@angular/core';
import { HttpService } from '@app/_services/http.service';
import { User } from '@app/_models/user.model';

@Component({
  selector: 'app-customer-container',
  templateUrl: './customer-container.component.html',
  styleUrls: ['./customer-container.component.scss']
})
export class CustomerContainerComponent implements OnInit {
  constructor(private _http: HttpService,) { }

  users: User[] = [];

  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this._http.get('users')
      .subscribe((res: User[]) => this.users = res, err => console.error(err));
  }
}
