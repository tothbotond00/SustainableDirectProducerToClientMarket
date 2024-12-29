import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../service/recipe.service';
import {Recipe} from '@shared/models/recipe';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@shared/common_services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {IngredientDialogComponent} from '../ingredient-dialog/ingredient-dialog.component';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
  standalone: false
})
export class RecipeComponent implements OnInit{

  recipeid = 0;
  recipe?: Recipe = undefined;
  isOwn: boolean = false;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router,
              private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.recipeid = +(params.get('id')!);
        this.refreshRecipe();
      }
    });
  };

  refreshRecipe() {
    this.recipeService.getRecipeById(this.recipeid).subscribe(data => {
        this.recipe = data;
        this.isOwn = this.authService.getUserId() == this.recipe.userId;
        console.log(this.recipe);
    });
  }

  // Redirect to the product page for a specific ingredient
  redirectToProduct(productId: number): void {
    this.router.navigate(['/product', productId]);
  }

  // Calculate the total price of the recipe based on linked product prices
  calculateRecipePrice(): number {
    if (this.recipe) {
      return this.recipe.productsInRecipes
        .filter(ingredient => ingredient.product?.price)
        .map(ingredient => ingredient.product!.price)
        .reduce((total, price: number) => total + price, 0);
    }
    return 0;
  }

  // Add all linked products to the basket
  addRecipeToBasket(): void {
    if (this.recipe) {
      const basketItems = this.recipe.productsInRecipes
        .filter(ingredient => ingredient.productId)
        .map(ingredient => ({
          productId: ingredient.productId,
          productName: ingredient.productName,
          price: ingredient.product?.price,
          quantity: 1
        }));

      console.log('Adding recipe ingredients to basket:', basketItems);
      alert('All ingredients have been added to your basket!');
    }
  }

  addIngredient() {
    const dialogRef = this.dialog.open(IngredientDialogComponent,
      {
        width: '550px',
        disableClose: true
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.type === 'product') {
          this.recipeService.post('addProduct', {
            productId: result.productId,
            recipeId: this.recipeid
          }).subscribe(result => {
            console.log('Product added:', result);
            this.refreshRecipe();
          });
        }
        else if (result.type === 'other') {
          this.recipeService.post('addProduct', {
            productName: result.name,
            recipeId: this.recipeid
          }).subscribe(result => {
            console.log('Ingredient added:', result);
            this.refreshRecipe();
          });
        }
      }
    })
  }

  onRemoveIngredient(productId?: number, productName?: string) {
    this.recipeService.deleteWithBody('deleteProduct', {
      recipeId: this.recipeid,
      productId: productId,
      productName: productName
    }).subscribe(result => {
      console.log('Ingredient removed:', result);
      this.refreshRecipe();
    });
  }

}
