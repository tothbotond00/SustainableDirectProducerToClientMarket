import { Basket } from "./basket";
import { Product } from "./product";

export class ProductInBasket {
    id: number = 0;
    productId: number = 0;
    product: Product = new Product();
    basketId: number = 0;
    basket: Basket = new Basket();
    quantity: number = 0;
    totalPrice: number = 0;
}
