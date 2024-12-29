import { Component, OnInit } from '@angular/core';
import { RecipeListService } from '../service/recipe-list.service';
import { ExampleData } from '../../../shared/models/exampledata';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
  standalone: false
})
export class RecipeListComponent implements OnInit{

  // Mock recipe data
  recipes = [
    { "id": 1, "name": "Spaghetti Carbonara", "description": "Egy klasszikus olasz tésztaétel, tojással, sajttal, pancettával és borssal." },
    { "id": 2, "name": "Csirke Curry", "description": "Egy ízletes és fűszeres indiai étel csirkével és aromás fűszerekkel." },
    { "id": 3, "name": "Görög Saláta", "description": "Egy frissítő saláta paradicsommal, uborkával, olívabogyóval, feta sajttal és olívaolajjal." },
    { "id": 4, "name": "Marha Stroganoff", "description": "Egy krémes orosz étel, pirított marhahússal és gombával, tejfölös szószban." },
    { "id": 5, "name": "Zöldség Wok", "description": "Egy gyors és egészséges étel, friss zöldségekkel, pirítva egy ízletes szószban." },
    { "id": 6, "name": "Csokoládétorta", "description": "Egy gazdag és szaftos desszert kakaóval, csokoládémázzal a tetején." },
    { "id": 7, "name": "Cézár Saláta", "description": "Egy saláta római salátával, krutonnal, parmezán sajttal és Cézár öntettel." },
    { "id": 8, "name": "Grillezett Lazac", "description": "Egy egyszerű és finom étel tökéletesen grillezett lazacfilével." },
    { "id": 9, "name": "Tacos", "description": "Egy mexikói étel, hússal, sajttal és zöldségekkel töltött tortilla." },
    { "id": 10, "name": "Almás Pite", "description": "Egy klasszikus desszert almával, fahéjjal és vajas tésztakéreggel." }
];

  // Pagination properties
  paginatedRecipes: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 0;

  dataFromService: ExampleData[] = [];

  constructor(private recipelist: RecipeListService, private router: Router) { }

  ngOnInit(): void {
    this.updatePagination();
      this.recipelist.get().subscribe(data => {
          this.dataFromService = data;
          console.log(this.dataFromService);
      });
  }

  // Update the recipes displayed on the current page
  updatePagination(): void {
    this.totalPages = Math.ceil(this.recipes.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRecipes = this.recipes.slice(startIndex, endIndex);
  }

  // Navigate to a specific page
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  // Redirect to the recipe details page with the corresponding ID
  redirectToRecipe(recipeId: number): void {
    this.router.navigate(['/recipe', recipeId]);
  }
}
