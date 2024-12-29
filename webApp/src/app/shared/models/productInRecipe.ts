import {Product} from '@shared/models/product';

export class ProductInRecipe {
  id: number = 0;
  recipeId: number = 0;
  productId?: number = 0;
  productName?: string = '';
  quantity: number = 0;
  product?: Product;
}
