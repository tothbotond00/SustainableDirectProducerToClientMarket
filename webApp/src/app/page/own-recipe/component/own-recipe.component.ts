import { Component, OnInit } from '@angular/core';
import {RecipeService} from '../../recipe/service/recipe.service';
import {AuthService} from '@shared/common_services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {RecipeDialogComponent} from '../recipe-dialog/recipe-dialog.component';
import {ConfirmDeletionDialogComponent} from '../../../confirm-deletion-dialog/confirm-deletion-dialog.component';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterDialogComponent } from '../../list/dialog/filter-dialog.component';
import {Recipe} from '@shared/models/recipe';

@Component({
  selector: 'app-own-recipe',
  templateUrl: './own-recipe.component.html',
  styleUrl: './own-recipe.component.scss',
  standalone: false
})
export class OwnRecipeComponent implements OnInit{

  selectedRecipeID?: number = undefined;
  dataFromService: Recipe[] = [];

  // Pagination properties
  paginatedRecipes: Recipe[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 0;

  filterData: any = {};
  filteredBySearch: Recipe[] = [];
  filteredByFilter: Recipe[] = [];
  dataToShown: Recipe[] = [];
  searchValue: string = '';
  form: FormGroup;


  constructor(private recipeService: RecipeService,
              private authService: AuthService,
              private dialog: MatDialog,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      recipe: ['']
    });
  }

  ngOnInit(): void {
    this.refreshRecipes();
  }

  refreshRecipes(): void {
    this.recipeService.getRecipesOfUser(this.authService.getUserId()).subscribe(data => {
      this.dataFromService = data;
      this.dataToShown = this.dataFromService;
      this.updatePagination();
    });
  }

  // Update the recipes displayed on the current page
  updatePagination(): void {
    this.totalPages = Math.ceil(this.dataToShown.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRecipes = this.dataToShown.slice(startIndex, endIndex);
  }

  // Navigate to a specific page
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  addNewRecipe(): void {
    const dialogRef = this.dialog.open(
      RecipeDialogComponent,
      {
        width: '550px',
        disableClose: true,
        data: { recipe: undefined }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.refreshRecipes();
    });
  }

  editRecipe(): void {
    if(this.selectedRecipeID) {
      const dialogRef = this.dialog.open(
        RecipeDialogComponent,
        {
          width: '550px',
          disableClose: true,
          data: { recipe: this.dataFromService.find(p => p.id === this.selectedRecipeID) }
        });

      //TODO fix: doesn't include the new recipe in the list
      dialogRef.afterClosed().subscribe(result => {
        this.refreshRecipes();
      });
    }
  }

  deleteRecipe(): void {
    if(this.selectedRecipeID) {
      const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent,
        {
          width: '500px',
          disableClose: true,
          data: { subject: 'recipe' }
        });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.recipeService.delete('', this.selectedRecipeID!).subscribe(() => {
            this.dataFromService = this.dataFromService.filter(p => p.id !== this.selectedRecipeID);
            this.refreshRecipes();
            this.updatePagination();
          });
        }
      });
    }
  }

  recipeInfo(): void {
    if (this.selectedRecipeID) {
      this.router.navigate(['/recipe', this.selectedRecipeID]);
    }
  }

  openFilter() {

    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '400px',
      data: this.filterData
    });

    dialogRef.afterClosed().subscribe(result => {
      if(!result) {
        return;
      }
      this.filterData = result;
      this.recipeService.get().subscribe(data => {
        this.dataFromService = data;
        this.applyFilter();
        this.form.get('recipe')?.setValue(this.form.get('recipe')?.value);
        this.updatePagination();
      });
    });
  }

  applyFilter() {

    if(this.searchValue == '') {

      this.filteredByFilter = this.dataFromService.filter((recipe) => {

        if(this.filterData.prodName != '') {
          if(!recipe.user.fullName.toLowerCase().includes(this.filterData.prodName.toLowerCase())) {
            return false;
          }
        }

        if(this.filterData.category != '') {
          if(recipe.categoryId != this.filterData.category) {
            return false;
          }
        }

        return true;
      });
    }
    else {

      this.filteredByFilter = this.filteredBySearch.filter((recipe) => {

        if(this.filterData.prodName != '') {
          if(!recipe.user.fullName.toLowerCase().includes(this.filterData.prodName.toLowerCase())) {
            return false;
          }
        }

        if(this.filterData.category != '') {
          if(recipe.categoryId != this.filterData.category) {
            return false;
          }
        }

        return true;
      });
    }

    this.dataToShown = this.filteredByFilter;
  }

  onSearchChange($event: any): void {
    if(this.filteredByFilter.length == 0) {
      if($event.target.value == '') {
        this.filteredBySearch = this.dataFromService;
        this.searchValue = '';
      }
      else {
        this.searchValue = $event.target.value;
        if(this.searchValue == '') {
          this.filteredBySearch = this.dataFromService;
          return;
        } else {
          this.filteredBySearch = this.dataFromService.filter((recipe) => {
            return recipe.title.toLowerCase().includes(this.searchValue.toLowerCase());
          });
        }
      }
    }
    else {
      if($event.target.value == '') {
        this.filteredBySearch = this.filteredByFilter;
        this.searchValue = '';
      } else {
        this.searchValue = $event.target.value;
        if(this.searchValue == '') {
          this.filteredBySearch = this.filteredByFilter;
        } else {
          this.filteredBySearch = this.filteredByFilter.filter((recipe) => {
            return recipe.title.toLowerCase().includes(this.searchValue.toLowerCase());
          });
        }
      }
    }

    this.dataToShown = this.filteredBySearch;
    this.updatePagination();
  }

}
