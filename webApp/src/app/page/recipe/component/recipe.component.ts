import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../service/recipe.service';
import {Recipe} from '@shared/models/recipe';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss',
  standalone: false
})
export class RecipeComponent implements OnInit{

  recipeid = 0;

  recipe = {
    id: 10,
    name: 'Almás Pite',
    description: 'Egy klasszikus desszert almával, fahéjjal és vajas tésztakéreggel.',
    ingredients: [
      { name: 'Liszt', productId: null, supplier: 'Helyi Malom', price: 399 },
      { name: 'Alma', productId: null, supplier: 'Helyi Gazda', price: 299 },
      { name: 'Vaj', productId: 12, supplier: 'Tejgazdaság', price: 649 },
      { name: 'Fahéj', productId: 18, supplier: 'FűszeresBolt', price: 199 }
    ],
    recipeUrl: '/assets/recipe/recipe10.jpg',
  };

  recipes = [
    {
      id: 1,
      name: 'Spaghetti Carbonara',
      description: 'Egy klasszikus olasz tésztaétel, tojással, sajttal, pancettával és borssal.',
      ingredients: [
        { name: 'Spagetti tészta', productId: null, supplier: 'Helyi', price: 1499 },
        { name: 'Pancetta', productId: 1, supplier: 'Hentesbolt', price: 1499 },
        { name: 'Parmezán sajt', productId: 2, supplier: 'Tejtermékek Kft.', price: 1999 },
        { name: 'Tojás', productId: null, supplier: 'Helyi Gazda', price: 129 },
        { name: 'Fekete bors', productId: null, supplier: 'Helyi Gazda', price: 1499 }
      ],
      recipeUrl: '/assets/recipe/recipe1.jpg',
    },
    {
      id: 2,
      name: 'Csirke Curry',
      description: 'Egy ízletes és fűszeres indiai étel csirkével és aromás fűszerekkel.',
      ingredients: [
        { name: 'Csirkemell', productId: 3, supplier: 'Húsbolt', price: 1999 },
        { name: 'Kókusztej', productId: 4, supplier: 'BioBolt', price: 899 },
        { name: 'Curry fűszerkeverék', productId: null, supplier: 'Helyi Termelő', price: 200 },
        { name: 'Hagyma', productId: null, supplier: 'Helyi Termelő', price: 199 }
      ],
      recipeUrl: '/assets/recipe/recipe2.jpg',
    },
    {
      id: 3,
      name: 'Görög Saláta',
      description: 'Egy frissítő saláta paradicsommal, uborkával, olívabogyóval, feta sajttal és olívaolajjal.',
      ingredients: [
        { name: 'Paradicsom', productId: null, supplier: 'Helyi Gazda', price: 699 },
        { name: 'Uborka', productId: null, supplier: 'Helyi Gazda', price: 499 },
        { name: 'Olívabogyó', productId: 5, supplier: 'Olíva Import', price: 1599 },
        { name: 'Feta sajt', productId: 6, supplier: 'Tejtermékek Kft.', price: 1899 },
        { name: 'Olívaolaj', productId: 7, supplier: 'Olíva Import', price: 2499 }
      ],
      recipeUrl: '/assets/recipe/recipe3.jpg',
    },
    {
      id: 4,
      name: 'Marha Stroganoff',
      description: 'Egy krémes orosz étel, pirított marhahússal és gombával, tejfölös szószban.',
      ingredients: [
        { name: 'Marhahús', productId: 8, supplier: 'Húsbolt', price: 3499 },
        { name: 'Gomba', productId: null, supplier: 'Helyi Gazda', price: 999 },
        { name: 'Tejföl', productId: 9, supplier: 'Tejtermékek Kft.', price: 399 },
        { name: 'Hagyma', productId: null, supplier: 'Helyi Termelő', price: 199 }
      ],
      recipeUrl: '/assets/recipe/recipe4.jpg',
    },
    {
      id: 5,
      name: 'Zöldség Wok',
      description: 'Egy gyors és egészséges étel, friss zöldségekkel, pirítva egy ízletes szószban.',
      ingredients: [
        { name: 'Sárgarépa', productId: null, supplier: 'Helyi Gazda', price: 299 },
        { name: 'Paprika', productId: null, supplier: 'Helyi Gazda', price: 599 },
        { name: 'Cukkini', productId: null, supplier: 'Helyi Gazda', price: 499 },
        { name: 'Szójaszósz', productId: 10, supplier: 'ÁzsiaBolt', price: 799 }
      ],
      recipeUrl: '/assets/recipe/recipe5.jpg',
    },
    {
      id: 6,
      name: 'Csokoládétorta',
      description: 'Egy gazdag és szaftos desszert kakaóval, csokoládémázzal a tetején.',
      ingredients: [
        { name: 'Liszt', productId: null, supplier: 'Helyi Malom', price: 399 },
        { name: 'Kakaópor', productId: 11, supplier: 'ÉdességBolt', price: 699 },
        { name: 'Vaj', productId: 12, supplier: 'Tejgazdaság', price: 649 },
        { name: 'Cukor', productId: null, supplier: 'Helyi Termelő', price: 299 }
      ],
      recipeUrl: '/assets/recipe/recipe6.jpg',
    },
    {
      id: 7,
      name: 'Cézár Saláta',
      description: 'Egy saláta római salátával, krutonnal, parmezán sajttal és Cézár öntettel.',
      ingredients: [
        { name: 'Római saláta', productId: null, supplier: 'Helyi Gazda', price: 599 },
        { name: 'Kruton', productId: 13, supplier: 'Pékség', price: 299 },
        { name: 'Parmezán sajt', productId: 2, supplier: 'Tejtermékek Kft.', price: 1999 },
        { name: 'Cézár öntet', productId: 14, supplier: 'SalátaMester', price: 599 }
      ],
      recipeUrl: '/assets/recipe/recipe7.jpg',
    },
    {
      id: 8,
      name: 'Grillezett Lazac',
      description: 'Egy egyszerű és finom étel tökéletesen grillezett lazacfilével.',
      ingredients: [
        { name: 'Lazacfilé', productId: 15, supplier: 'Halászati Kft.', price: 4999 },
        { name: 'Citrom', productId: null, supplier: 'Helyi Termelő', price: 199 },
        { name: 'Fokhagyma', productId: null, supplier: 'Helyi Termelő', price: 399 },
        { name: 'Olívaolaj', productId: 7, supplier: 'Olíva Import', price: 2499 }
      ],
      recipeUrl: '/assets/recipe/recipe8.jpg',
    },
    {
      id: 9,
      name: 'Tacos',
      description: 'Egy mexikói étel, hússal, sajttal és zöldségekkel töltött tortilla.',
      ingredients: [
        { name: 'Tortilla', productId: 16, supplier: 'MexikóiBolt', price: 999 },
        { name: 'Marhahús', productId: 8, supplier: 'Húsbolt', price: 3499 },
        { name: 'Cheddar sajt', productId: 17, supplier: 'Tejtermékek Kft.', price: 1899 },
        { name: 'Paradicsom', productId: null, supplier: 'Helyi Gazda', price: 699 }
      ],
      recipeUrl: '/assets/recipe/recipe9.jpg',
    },
    {
      id: 10,
      name: 'Almás Pite',
      description: 'Egy klasszikus desszert almával, fahéjjal és vajas tésztakéreggel.',
      ingredients: [
        { name: 'Liszt', productId: null, supplier: 'Helyi Malom', price: 399 },
        { name: 'Alma', productId: null, supplier: 'Helyi Gazda', price: 299 },
        { name: 'Vaj', productId: 12, supplier: 'Tejgazdaság', price: 649 },
        { name: 'Fahéj', productId: 18, supplier: 'FűszeresBolt', price: 199 }
      ],
      recipeUrl: '/assets/recipe/recipe10.jpg',
    }
  ];

  dataFromService: Recipe[] = [];

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.recipeid = +(params.get('id')!);
      this.recipeService.get().subscribe(data => {
          this.dataFromService = data;
          console.log(this.dataFromService);
      });
      const foundRecipe = this.recipes.find(recipe => recipe.id === this.recipeid);
      if (foundRecipe) {
        this.recipe = foundRecipe;
      } else {
        console.error(`Recipe with id ${this.recipeid} not found.`);
      }
  }
  })};

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
