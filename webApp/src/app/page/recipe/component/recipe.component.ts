import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../service/recipe.service';
import { ExampleData } from '../../../shared/models/exampledata';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
  standalone: false
})
export class RecipeComponent implements OnInit{

  recipe = {
    id: 1,
    name: 'Honey Cake',
    description: 'A delicious honey cake made with love.',
    
    ingredients: [
      { name: 'Flour', productId: null, supplier: null, price: null }, // Simple ingredient
      { name: 'Honey', productId: 1, supplier: 'Jack', price: 15.99 }, // Linked product
      { name: 'Sugar', productId: null, supplier: null, price: null }, // Simple ingredient
      { name: 'Butter', productId: 2, supplier: 'Dairy Farm', price: 6.49 } // Linked product
    ]
  };

  dataFromService: ExampleData[] = [];

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
      this.recipeService.get().subscribe(data => {
          this.dataFromService = data;
          console.log(this.dataFromService);
      });
  }

  // Redirect to the product page for a specific ingredient
  redirectToProduct(productId: number): void {
    //this.router.navigate(['/product', productId]);
  }

  // Calculate the total price of the recipe based on linked product prices
  calculateRecipePrice(): number {
    return this.recipe.ingredients
      .filter(ingredient => ingredient.price)
      .reduce((total, ingredient: any) => total + ingredient.price, 0);
  }

  // Add all linked products to the basket
  addRecipeToBasket(): void {
    const basketItems = this.recipe.ingredients
      .filter(ingredient => ingredient.productId)
      .map(ingredient => ({
        productId: ingredient.productId,
        productName: ingredient.name,
        price: ingredient.price,
        quantity: 1
      }));

    console.log('Adding recipe ingredients to basket:', basketItems);
    alert('All ingredients have been added to your basket!');
  }

}
