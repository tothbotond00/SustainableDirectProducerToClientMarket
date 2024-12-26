import { ProductInBasket } from "./productInBasket";

export class Basket {
    id: number = 0;
    userId: number = 0;
    productsInBasket: ProductInBasket[] = [];
    isSent: boolean = false;
    totalPrice: number = 0;
}