
export interface Item {
    _id: string;
    name: string,
    category: string,
    sub_category: string,
    images: [string],
    description: string,
    price: number,
    rating: number,
    quantity: number,
    measurement: string,
    variant: string,
    tags: [string]
}
