import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Form } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import {
  faChevronLeft,
  faSave,
  faPencilAlt,
  faTimes,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { HttpService } from "@app/_services/http.service";
import { Item } from "@app/_models/item.model";
import env from "@app/_config/envirponment.dev";

@Component({
  selector: "app-view-item",
  templateUrl: "./view-item.component.html",
  styleUrls: ["./view-item.component.scss"],
})
export class ViewItemComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _http: HttpService,
  ) {}

  public item: Item;
  public id: string;
  public faChevronLeft = faChevronLeft;
  public faSave = faSave;
  public faPencilAlt = faPencilAlt;
  public faPlus = faPlus;
  public faTimes = faTimes;
  public loading = false;
  public itemForm: FormGroup;
  public images: File[] = [];
  public preview = [];
  private _env = env;

  public categories = [
    {
      name: "Meat",
      id: 1,
      sub_categories: [
        {
          name: "Poultry",
          category_id: 1,
          id: 1,
        },
        {
          name: "Cattle",
          category_id: 1,
          id: 2,
        },
      ],
    },
    {
      name: "Vegetables",
      id: 2,
      sub_categories: [
        {
          name: "Leafy", // lettuce, spinach and silverbeet.
          category_id: 2,
          id: 1,
        },
        {
          name: "Cruciferous", //cabbage, cauliflower, Brussels sprouts and broccoli.
          category_id: 2,
          id: 2,
        },
        {
          name: "Marrow ", // pumpkin, cucumber and zucchini.
          category_id: 2,
          id: 3,
        },
        {
          name: "Root", // potato, sweet potato and yam..
          category_id: 2,
          id: 4,
        },
        {
          name: "Edible plant stem ", // celery and asparagus.
          category_id: 2,
          id: 5,
        },
        {
          name: "Allium", // onion, garlic and shallot,.
          category_id: 2,
          id: 6,
        },
      ],
    },
    {
      name: "Eggs",
      id: 3,
      sub_categories: [
        {
          name: "Chicken", // lettuce, spinach and silverbeet.
          category_id: 3,
          id: 1,
        },
        {
          name: "Duck", //cabbage, cauliflower, Brussels sprouts and broccoli.
          category_id: 3,
          id: 2,
        },
        {
          name: "Quail ", // pumpkin, cucumber and zucchini.
          category_id: 3,
          id: 3,
        },
      ],
    },
    {
      name: "Fruits",
      id: 4,
      sub_categories: [
        {
          name: "Citrus", // oranges, grapefruits, mandarins and limes
          category_id: 4,
          id: 1,
        },
        {
          name: "Stone Fruit", // nectarines, apricots, peaches and plums
          category_id: 4,
          id: 2,
        },
        {
          name: "Tropical ", //  bananas and mangoes
          category_id: 4,
          id: 3,
        },
        {
          name: "Berries", // strawberries, raspberries, blueberries, kiwifruit and passionfruit
          category_id: 4,
          id: 4,
        },
        {
          name: "Melons", // watermelons, rockmelons and honeydew melons
          category_id: 4,
          id: 5,
        },
        {
          name: "Apples", // Apples and pears.
          category_id: 4,
          id: 6,
        },
        {
          name: "Others", // Tomatoes and avocados.
          category_id: 4,
          id: 7,
        },
      ],
    },
    {
      name: "Diary",
      id: 5,
      sub_categories: [
        {
          name: "Cow", // oranges, grapefruits, mandarins and limes
          category_id: 5,
          id: 1,
        },
        {
          name: "Buffalo", // nectarines, apricots, peaches and plums
          category_id: 5,
          id: 2,
        },
        {
          name: "Goat ", //  bananas and mangoes
          category_id: 5,
          id: 3,
        },
      ],
    },
    {
      name: "Seafood",
      id: 6,
      sub_categories: [
        {
          name: "Prawn",
          category_id: 6,
          id: 1,
        },
        {
          name: "Crab",
          category_id: 6,
          id: 2,
        },
        {
          name: "Shrimps",
          category_id: 6,
          id: 3,
        },
        {
          name: "Squid",
          category_id: 6,
          id: 4,
        },
        {
          name: "Cuttlefish",
          category_id: 6,
          id: 5,
        },
        {
          name: "Clams",
          category_id: 6,
          id: 6,
        },
        {
          name: "Oysters",
          category_id: 6,
          id: 7,
        },
        {
          name: "Aiyla – Mackerel",
          category_id: 6,
          id: 8,
        },
        {
          name: "Mathi/Chaala – Sardine",
          category_id: 6,
          id: 9,
        },
        {
          name: "Avoli – Pomfret",
          category_id: 6,
          id: 10,
        },
        {
          name: "Aakoli – Silver Moony",
          category_id: 6,
          id: 11,
        },
        {
          name: "Choora – Tuna",
          category_id: 6,
          id: 12,
        },
        {
          name: "Kora / Kaala – Salmon",
          category_id: 6,
          id: 13,
        },
        {
          name: "Ney Meen – Seer Fish / Queen Fish",
          category_id: 6,
          id: 14,
        },
        {
          name: "Kari Meen – Pearl Spot/ Green Chromide",
          category_id: 6,
          id: 15,
        },
        {
          name: "Thilopia/Kerala Karimeen – Tilapia",
          category_id: 6,
          id: 16,
        },
        {
          name: "Kozhuva – Indian Anchovy",
          category_id: 6,
          id: 17,
        },
        {
          name: "Varaal – Snake Head",
          category_id: 6,
          id: 18,
        },
      ],
    },
  ];
  public measurements = [
    {
      name: "KG",
      id: 1,
    },
    {
      name: "Gram",
      id: 2,
    },
    {
      name: "Litre",
      id: 3,
    },
    {
      name: "Nos",
      id: 4,
    },
  ];

  get form() {
    return this.itemForm.value;
  }

  ngOnInit(): void {
    this._route.params.subscribe((param) => {
      this.id = param.id;
      this._getItem(this.id);
    });
  }

private _getItem(id: string) {
    this._http.get(`item/${id}`).subscribe(
      (res: any) => {
        this.item = res.data;
        // adding the only image to preview
        this.preview.push(`${this._env.assetsUrl}/${this.item.images[0]}`);
        this._generateForm(this.item);
      },
      (err) => console.log(err),
    );
  }

  _generateForm(item: any) {
    this.itemForm = this._fb.group({
      name: item.name,
      category: this.categories.find(
        (category) => category.id == item.category,
      ),
      sub_category: item.sub_category,
      description: item.description,
      price: item.price,
      measurement: item.measurement,
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
    const form = Object.assign({}, this.itemForm.value);
    let fd = new FormData();
    form.category = form.category.id;
    fd.append('id',this.item._id);
    for (let key in form) {
      fd.append(key, form[key]);
    }
    for (let i = 0; i < this.images.length; i++) {
      fd.append("file", this.images[i]);
    }
    this._http.patch("item", fd).subscribe(
      (res: any) => {
        console.log(res);
        // this._orderStore.add(res.data);
        this._router.navigate(["items"]);
      },
      (err) => console.log(err),
    );
  }
}
