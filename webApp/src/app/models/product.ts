export class Product {
  id: number = 0;
  name: string = '';
  description: string = '';
  stock: number = 0;

  constructor(id: number, name: string, description: string, stock: number) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.stock = stock;
  }


}
