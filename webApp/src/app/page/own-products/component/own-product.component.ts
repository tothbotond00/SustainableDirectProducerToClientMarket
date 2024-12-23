import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../product/service/product.service';
import {AuthService} from '@shared/common_services/auth.service';
import {ExampleData} from '../../models/exampledata';
import {MatDialog} from '@angular/material/dialog';
import {NewProductDialogComponent} from '../new-product-dialog/new-product-dialog.component';

@Component({
  selector: 'app-own-product',
  templateUrl: './own-product.component.html',
  styleUrl: './own-product.component.scss',
  standalone: false
})
export class OwnProductComponent implements OnInit{

  isActive = true;
  products: ExampleData[] = []; //TODO change to product, display them
  constructor(private productService: ProductService,
              private authService: AuthService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.productService.get('user/' + this.authService.getUserId()).subscribe(data => {
      this.products = data;
      console.log(this.products);
    });
  }

  addNewProduct(): void {
    this.dialog.open(NewProductDialogComponent,
      {
        width: '550px',
        disableClose: true
      })
  }


}
