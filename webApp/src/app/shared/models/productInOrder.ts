import { Order } from "./order";
import { Product } from "./product";

export class ProductInOrder {

    id: number = 0;
    productId: number = 0;
    product: Product = new Product();
    orderId: number = 0;
    order: Order = new Order();
    quantity: number = 0;
    totalPrice: number = 0;
}