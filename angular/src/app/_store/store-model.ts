import { Order } from '../_models/order.model';
import { Item } from '@app/_models/item.model';
import { User } from '@app/_models/user.model';

export interface OrderState {
    orders: Order[];
    order: Order;
}

export interface ItemState {
    items: Item[];
    item: Item;
}

export interface UserState {
    users: User[];
    user: User;
}