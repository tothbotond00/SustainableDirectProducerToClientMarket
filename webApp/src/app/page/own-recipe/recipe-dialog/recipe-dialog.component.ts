import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../../recipe/service/recipe.service';
import {AuthService} from '@shared/common_services/auth.service';
import {CategoryRecipeService} from '@shared/common_services/category-recipe.service';
import { Category } from '@shared/models/category';
import { Recipe } from '@shared/models/recipe';


@Component({
  selector: 'app-recipe-dialog',
  standalone: false,

  templateUrl: './recipe-dialog.component.html',
  styleUrl: './recipe-dialog.component.scss'
})
export class RecipeDialogComponent implements OnInit{

  recipe?: Recipe = undefined;
  form!: FormGroup;
  buttonText: string = 'Recept hozzáadása';
  disabledButton: boolean = false;
  errorMessage: string = '';
  success: boolean = false;
  categories: Category[] = [];
  selectedFile?: File;

  constructor(private dialogRef: MatDialogRef<RecipeDialogComponent>,
              private formBuilder: FormBuilder,
              private recipeService: RecipeService,
              private authService: AuthService,
              private categoryService: CategoryRecipeService,
              @Inject(MAT_DIALOG_DATA) public data: { recipe?: Recipe }) {

    this.recipe = data.recipe;
    if (this.recipe) this.buttonText = 'Recept frissítése';
    this.form = this.formBuilder.group({
      title: [this.recipe?.title ?? '', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
      description: [this.recipe?.description ?? '', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      image: [''],
      categoryId: [this.recipe?.categoryId ?? '', [Validators.required]],
      steps : [this.recipe?.steps ?? '', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
    })
  }

  onAddRecipeClick() {
    if (!this.recipe && !this.selectedFile) {
      this.form.controls['image'].setErrors({ 'incorrect': true });
      this.errorMessage = 'Új recept esetén meg kell adni egy képet!';
      return;
    }
    this.buttonText = 'Betöltés...';
    this.disabledButton = true;

    const formData = new FormData();
    formData.append('title', this.form.controls['title'].value);
    formData.append('description', this.form.controls['description'].value);
    formData.append('userId', this.authService.getUserId().toString());
    formData.append('recipeCategoryId', this.form.controls['categoryId'].value);
    formData.append('steps', this.form.controls['steps'].value);
    if (this.selectedFile) formData.append('image', this.selectedFile as Blob);

    setTimeout(() => {
      if (!this.recipe) {
        this.recipeService.post('', formData).subscribe({
          next: data => {
            this.success = true;
            setTimeout(() => {
              this.dialogRef.close(true);
            }, 1500);
          },
          error: error => {
            console.log(error);
            this.errorMessage = error.error;
            this.disabledButton = false;
            this.buttonText = 'Recept hozzáadása';

            setTimeout(() => {
              this.errorMessage = '';
            }, 1500);
          }
        });
      }
      else {
        this.recipeService.put(this.recipe.id.toString(), formData).subscribe({
          next: data => {
            this.success = true;
            setTimeout(() => {
              this.dialogRef.close(true);
            }, 1500);
          },
          error: error => {
            console.log(error);
            this.errorMessage = error.error;
            this.disabledButton = false;
            this.buttonText = 'Recept frissítése';

            setTimeout(() => {
              this.errorMessage = '';
            }, 3000);
          }
        });
      }
    }, 3000);
  }

  close() {
    this.dialogRef.close(false);
  }

  ngOnInit(): void {
    this.categoryService.get('').subscribe(data => {
      this.categories = data;
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const validImageTypes = ['image/jpeg', 'image/png', 'image/bmp', 'image/webp', 'image/jpg'];
      if (!validImageTypes.includes(file.type)) {
        this.form.controls['image'].setErrors({ 'incorrect': true });
        return;
      }
      this.form.controls['image'].setErrors(null);
      this.selectedFile = file;
    }
  }

}
