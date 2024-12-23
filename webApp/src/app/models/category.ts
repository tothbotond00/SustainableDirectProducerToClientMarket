export class Category {
  id: number;
  name: string;
  //TODO products? do we want to store these for categories?

  constructor(id: number, name: string){
    this.id = id;
    this.name = name;
  }
}
