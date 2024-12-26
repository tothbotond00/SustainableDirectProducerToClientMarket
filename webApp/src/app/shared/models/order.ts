import { ProductInOrder } from "./productInOrder";
import { User } from "./user";

export class Order {
    id: number = 0;
    producerId: number = 0;
    customerId: number = 0;
    customer: User = new User();
    receivedAt: string = '';
    sentAt: string = '';
    isSent: boolean = false;
    totalPrice: number = 0;
    products: ProductInOrder[] = [];
}