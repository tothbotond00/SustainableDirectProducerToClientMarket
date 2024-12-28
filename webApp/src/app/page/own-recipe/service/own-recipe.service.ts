import { Inject, Injectable } from '@angular/core';
import { ServiceBase } from '@shared/common_services/service-base';
import { HttpClient } from '@angular/common/http';
import { ExampleData } from '../../../shared/models/exampledata';
import {Recipe} from '@shared/models/recipe';
import {map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwnRecipeService extends ServiceBase<Recipe> {

  constructor(protected override http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    super(http, baseUrl, 'api/Recipe');
  }

  // Gets the product, with the imageUrl property filled.
    getRecipeById(id: number): Observable<Recipe> {
      return this.getOne(id.toString()).pipe(
        map(recipe => {
          recipe.imageUrl = this.createImageFromBase64(recipe.image);
          return recipe;
        })
      );
    }
  
    // Gets the products of the user, with the imageUrl property filled.
    getRecipesOfUser(userId: number): Observable<Recipe[]> {
      return this.get('user/' + userId).pipe(
        map(recipes => {
          recipes.forEach(recipe => {
            if (recipe.image)
              recipe.imageUrl = this.createImageFromBase64(recipe.image);
          });
          return recipes;
        })
      );
    }
  
    // Converts the base64 image to a URL.
    private createImageFromBase64(base64Image: string): string {
      const byteCharacters = atob(base64Image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/jpeg' });
      return URL.createObjectURL(blob);
    }

}
