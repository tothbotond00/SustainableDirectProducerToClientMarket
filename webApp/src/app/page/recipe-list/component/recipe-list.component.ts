import { Component, OnInit } from '@angular/core';
import { RecipeListService } from '../service/recipe-list.service';
import { ExampleData } from '../../../shared/models/exampledata';
import { Router } from '@angular/router';
import {Recipe} from '@shared/models/recipe';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
  standalone: false
})
export class RecipeListComponent implements OnInit{

  recipes: Recipe[] = [];

  // Pagination properties
  paginatedRecipes: Recipe[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 0;

  constructor(private recipelist: RecipeListService, private router: Router) { }

  ngOnInit(): void {
    this.refreshRecipes();
    this.updatePagination();
  }

  refreshRecipes(): void {
    this.recipelist.getRecipes().subscribe(data => {
      this.recipes = data;
      this.updatePagination();
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

  redirectToOwnRecipes(): void {
    this.router.navigate(['/own-recipe']);
  }
}
