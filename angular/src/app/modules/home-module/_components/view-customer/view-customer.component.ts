import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, FormControl, Form } from "@angular/forms";
import env from "@app/_config/envirponment.dev";
import { HttpService } from "@app/_services/http.service";
import { User } from "@app/_models/user.model";
import {
  faChevronLeft,
  faSave,
  faPencilAlt,
  faTimes,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-view-customer",
  templateUrl: "./view-customer.component.html",
  styleUrls: ["./view-customer.component.scss"],
})
export class ViewCustomerComponent implements OnInit {
  constructor(
    private _http: HttpService,
    private _route: ActivatedRoute,
    private _fb: FormBuilder,
    private _router: Router,
  ) {}

  public user: User;
  private _id: string;
  public faChevronLeft = faChevronLeft;
  public faSave = faSave;
  public faPencilAlt = faPencilAlt;
  public faPlus = faPlus;
  public faTimes = faTimes;
  public loading = false;
  public userForm: FormGroup;
  public images: File[] = [];
  public preview = [];
  private _env = env;

  ngOnInit(): void {
    this._route.params.subscribe((param) => {
      this._id = param.id;
      this._getUser(this._id);
    });
  }
  
  get form() {
    return this.userForm.value;
  }

  private _getUser(id: string) {
    this._http.get(`user/${id}`).subscribe(
      (res: any) => {
        console.log(res.payload[0]);
        this.user = res.payload[0];
        this._generateForm(this.user);
      },
      (err) => console.log(err),
    );
  }

  _generateForm(user: any) {
    this.userForm = this._fb.group({
      first_name: user.first_name,
      last_name: user.last_name,
      email:user.email,
      age:user.age,
      phone: user.phone,
      sex: user.sex,
      address: this._fb.group({
        line_1: this.user.address.line_1,
        line_2: this.user.address.line_2,
        city: this.user.address.city,
        state: this.user.address.state,
        phone: this.user.address.phone,
        pin: this.user.address.pin
      }),
    });
  }

  public selectFiles(event) {
    // onchange on input file
    const files: FileList = event.target.files; // getting file from event object
    this.images = Array.from(files); // to use splice
    this.preview = []; // for single image only. remove late for multiple images
    let vm = this;
    //  for preview purpose only
    if (event.target.files) {
      for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        reader.onload = function (e) {
          let img = e.target.result;
          vm.preview.push(img);
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  public deleteImage(index) {
    this.preview.splice(index, 1);
    this.images.splice(index, 1);
  }

  public cancel() {
    this._router.navigate(["items"]);
  }

  public save() {
    const form = Object.assign({}, this.userForm.value);
    let fd = new FormData();
    fd.append("id", this.user._id);
    for (let key in form) {
      fd.append(key, form[key]);
    }
    for (let i = 0; i < this.images.length; i++) {
      fd.append("file", this.images[i]);
    }
    this._http.patch("user", fd).subscribe(
      (res: any) => {
        console.log(res);
        // this._orderStore.add(res.data);
        this._router.navigate(["items"]);
      },
      (err) => console.log(err),
    );
  }
}
