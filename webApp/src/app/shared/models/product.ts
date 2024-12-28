import { User } from "./user";

export class Product {
  id: number = 0;
  name: string = '';
  description: string = '';
  price: number = 0;
  imageUrl: string = '';
  image: string = '';
  stock: number = 0;
  categoryId: number = 0;
  unit: string = '';
  category: string = '';
  userId: number = 0;
  user: User = new User();
}
