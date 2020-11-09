import { Item } from './item.model';
import { User } from './user.model';
import { Address } from './address.model';

export interface Order {
    _id: string;
    items: [Item];
    address: Address;
    date: Date,
    delivery_date: Date,
    user: User,
    is_completed: boolean,
    is_canceled: boolean
}
