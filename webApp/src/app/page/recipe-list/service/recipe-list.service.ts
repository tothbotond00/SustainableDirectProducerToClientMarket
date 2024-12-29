import { Inject, Injectable } from '@angular/core';
import { ServiceBase } from '@shared/common_services/service-base';
import { HttpClient } from '@angular/common/http';
import {Recipe} from '@shared/models/recipe';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeListService extends ServiceBase<Recipe> {

  constructor(protected override http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl, 'api/Recipe');
  }

  getRecipes(): Observable<Recipe[]> {
    return this.get().pipe(
      map(recipes => {
        recipes.forEach(recipe => {
          recipe.imageUrl = this.createImageFromBase64(recipe.image);
        });
        return recipes;
      })
    );
  }

}
