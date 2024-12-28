import { User } from "./user";

export class Recipe {
  id: number = 0;
  title: string = '';
  description: string = '';
  recipeCategoryId: number = 0;
  steps: string = '';
  imageUrl: string = '';
  isPublished: number = 0;
  categoryId: number = 0;
  userId: number = 0;
  user: User = new User();
  image: string = '';
}
