import { Component, OnInit } from '@angular/core';
import { RecipeListService } from '../service/recipe-list.service';
import { ExampleData } from '../../../shared/models/exampledata';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss',
  standalone: false
})
export class RecipeListComponent implements OnInit{

  // Mock recipe data
  recipes = [
    { id: 1, name: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish made with eggs, cheese, pancetta, and pepper.' },
    { id: 2, name: 'Chicken Curry', description: 'A flavorful and spicy Indian dish made with chicken and aromatic spices.' },
    { id: 3, name: 'Greek Salad', description: 'A refreshing salad with tomatoes, cucumbers, olives, feta cheese, and olive oil.' },
    { id: 4, name: 'Beef Stroganoff', description: 'A creamy Russian dish made with sautéed beef and mushrooms in a sour cream sauce.' },
    { id: 5, name: 'Vegetable Stir-fry', description: 'A quick and healthy dish made with fresh vegetables stir-fried in a savory sauce.' },
    { id: 6, name: 'Chocolate Cake', description: 'A rich and moist dessert made with cocoa and topped with chocolate frosting.' },
    { id: 7, name: 'Caesar Salad', description: 'A salad with romaine lettuce, croutons, Parmesan cheese, and Caesar dressing.' },
    { id: 8, name: 'Grilled Salmon', description: 'A simple and delicious dish of salmon fillets grilled to perfection.' },
    { id: 9, name: 'Tacos', description: 'A Mexican dish made with folded tortillas filled with meat, cheese, and vegetables.' },
    { id: 10, name: 'Apple Pie', description: 'A classic dessert made with apples, cinnamon, and a flaky pastry crust.' }
  ];

  // Pagination properties
  paginatedRecipes: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 0;

  dataFromService: ExampleData[] = [];

  constructor(private recipelist: RecipeListService) { }

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
    //this.router.navigate(['/recipe', recipeId]);
  }
}
