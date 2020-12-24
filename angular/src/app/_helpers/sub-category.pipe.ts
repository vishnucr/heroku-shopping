import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sub_category'
})
export class SubCategoryPipe implements PipeTransform {
  private categories = [
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

  transform(id: number, category_id:number): string {
    const category = this.categories.find(category => category.id == category_id);
    const sub_category = category.sub_categories.find(sub => sub.id == id);
    return sub_category.name;
  }

}
