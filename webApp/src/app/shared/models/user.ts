import { Basket } from "./basket";
import { Order } from "./order";
import { Product } from "./product";

export class User {
    id: number = 0;
    username: string = '';
    email: string = '';
    role: string = '';
    isCustomer: boolean = true;
    fullName: string = '';
    address: string = '';
    taxNumber: string = '';
    products: Product[] = [];
    basket: Basket = new Basket();
    orders: Order[] = [];
}