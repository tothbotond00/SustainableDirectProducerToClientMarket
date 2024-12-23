import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../product/service/product.service';
import {AuthService} from '@shared/common_services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {ProductDialogComponent} from '../product-dialog/product-dialog.component';
import {Product} from '../../../models/product';
import {ConfirmDeletionDialogComponent} from '../../../confirm-deletion-dialog/confirm-deletion-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-own-product',
  templateUrl: './own-product.component.html',
  styleUrl: './own-product.component.scss',
  standalone: false
})
export class OwnProductComponent implements OnInit{

  selectedProductID?: number = undefined;
  products: Product[] = [];

  // Pagination properties
  paginatedProducts: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 0;


  constructor(private productService: ProductService,
              private authService: AuthService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    this.refreshProducts();
  }

  refreshProducts(): void {
    this.productService.get('user/' + this.authService.getUserId()).subscribe(data => {
      this.products = data;
      this.updatePagination();
    });
  }

  // Update the products displayed on the current page
  updatePagination(): void {
    this.totalPages = Math.ceil(this.products.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.products.slice(startIndex, endIndex);
  }

  // Navigate to a specific page
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  addNewProduct(): void {
    this.dialog.open(
      ProductDialogComponent,
      {
        width: '550px',
        disableClose: true,
        data: { product: undefined }
      }
    );
  }

  editProduct(): void {
    if(this.selectedProductID) {
      const dialogRef = this.dialog.open(
        ProductDialogComponent,
        {
          width: '550px',
          disableClose: true,
          data: { product: this.products.find(p => p.id === this.selectedProductID) }
        });

      //TODO fix: doesn't include the new product in the list
      dialogRef.afterClosed().subscribe(result => {
        this.refreshProducts();
      });
    }
  }

  deleteProduct(): void {
    if(this.selectedProductID) {
      const dialogRef = this.dialog.open(ConfirmDeletionDialogComponent,
        {
          width: '500px',
          disableClose: true,
          data: { subject: 'product' }
        });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.productService.delete('', this.selectedProductID!).subscribe(() => {
            this.products = this.products.filter(p => p.id !== this.selectedProductID);
            this.updatePagination();
          });
        }
      });
    }
  }

  productInfo(): void {
    if (this.selectedProductID) {
      this.router.navigate(['/product', this.selectedProductID]);
    }
  }


}
