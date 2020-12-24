import { Address } from './address.model';

export interface User {
    _id: string;
	first_name: string,
	last_name: string,
	image: string,
	sex: string,
	username: string,
	age: number,
	email: string,
	phone: number,
	address: Address
}
