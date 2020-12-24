import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
// import { HttpService } from "@app/_services/http.service";
import { User } from "@app/_models/user.model";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { UserService } from "@app/_store/store";

@Component({
  selector: "app-customer-container",
  templateUrl: "./customer-container.component.html",
  styleUrls: ["./customer-container.component.scss"],
})
export class CustomerContainerComponent implements OnInit {
  constructor(
    // private _http: HttpService,
    private _router: Router,
    private _userStore: UserService,
  ) {}

  private _userStoreSubscription: Subscription;
  public users: User[] = [];
  public faPencilAlt = faPencilAlt;

  ngOnInit(): void {
    this._getUsers();
  }

  ngOnDestroy() {
    this._userStoreSubscription.unsubscribe();
  }

  private _getUsers() {
    this._userStoreSubscription = this._userStore.stateChanged.subscribe(
      (state) => {
        if (state) {
          this.users = state.users;
        }
      }
    );
  }

  edit(user: User) {
    this._router.navigateByUrl(`customers/view/${user._id}`);
  }
}
