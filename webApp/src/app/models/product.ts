export class Product {
  id: number = 0;
  name: string = '';
  description: string = '';
  stock: number = 0;
  price: number = 0;
  categoryId: number = 0;

  constructor(id: number, name: string, description: string, stock: number, price: number, categoryId: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.stock = stock;
    this.price = price;
    this.categoryId = categoryId;
  }


}
