import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../product/service/product.service';
import {AuthService} from '@shared/common_services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {ProductDialogComponent} from '../product-dialog/product-dialog.component';
import {Product} from '@shared/models/product';
import {ConfirmDeletionDialogComponent} from '../../../confirm-deletion-dialog/confirm-deletion-dialog.component';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FilterDialogComponent } from '../../list/dialog/filter-dialog.component';

@Component({
  selector: 'app-own-product',
  templateUrl: './own-product.component.html',
  styleUrl: './own-product.component.scss',
  standalone: false
})
export class OwnProductComponent implements OnInit{

  selectedProductID?: number = undefined;
  dataFromService: Product[] = [];

  // Pagination properties
  paginatedProducts: Product[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 0;

  filterData: any = {};
  filteredBySearch: Product[] = [];
  filteredByFilter: Product[] = [];
  dataToShown: Product[] = [];
  searchValue: string = '';
  form: FormGroup;


  constructor(private productService: ProductService,
              private authService: AuthService,
              private dialog: MatDialog,
              private router: Router,
              private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      product: ['']
    });
  }

  ngOnInit(): void {
    this.refreshProducts();
  }

  refreshProducts(): void {
    this.productService.getProductsOfUser(this.authService.getUserId()).subscribe(data => {
      this.dataFromService = data;
      this.dataToShown = this.dataFromService;
      this.updatePagination();
    });
  }

  // Update the products displayed on the current page
  updatePagination(): void {
    this.totalPages = Math.ceil(this.dataToShown.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.dataToShown.slice(startIndex, endIndex);
  }

  // Navigate to a specific page
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  addNewProduct(): void {
    const dialogRef = this.dialog.open(
      ProductDialogComponent,
      {
        width: '550px',
        disableClose: true,
        data: { product: undefined }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.refreshProducts();
    });
  }

  editProduct(): void {
    if(this.selectedProductID) {
      const dialogRef = this.dialog.open(
        ProductDialogComponent,
        {
          width: '550px',
          disableClose: true,
          data: { product: this.dataFromService.find(p => p.id === this.selectedProductID) }
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
            this.dataFromService = this.dataFromService.filter(p => p.id !== this.selectedProductID);
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
      this.productService.get().subscribe(data => {
        this.dataFromService = data;
        this.applyFilter();
        this.form.get('product')?.setValue(this.form.get('product')?.value);
        this.updatePagination();
      });
    });
  }

  applyFilter() {

    if(this.searchValue == '') {
      if(this.filterData.priceAsc) {
        this.filteredByFilter = this.dataFromService.sort((a, b) => a.price - b.price);
      }

      this.filteredByFilter = this.dataFromService.filter((product) => {

        if(this.filterData.minPrice != '') {
          if(product.price < this.filterData.minPrice) {
            return false;
          }
        }

        if(this.filterData.maxPrice != '') {
          if(product.price > this.filterData.maxPrice) {
            return false;
          }
        }

        if(this.filterData.prodName != '') {
          if(!product.user.fullName.toLowerCase().includes(this.filterData.prodName.toLowerCase())) {
            return false;
          }
        }

        if(this.filterData.category != '') {
          if(product.categoryId != this.filterData.category) {
            return false;
          }
        }

        return true;
      });
    }
    else {
      if(this.filterData.priceAsc) {
        this.filteredByFilter = this.filteredBySearch.sort((a, b) => a.price - b.price);
      }

      this.filteredByFilter = this.filteredBySearch.filter((product) => {

        if(this.filterData.minPrice != '') {
          if(product.price < this.filterData.minPrice) {
            return false;
          }
        }

        if(this.filterData.maxPrice != '') {
          if(product.price > this.filterData.maxPrice) {
            return false;
          }
        }

        if(this.filterData.prodName != '') {
          if(!product.user.fullName.toLowerCase().includes(this.filterData.prodName.toLowerCase())) {
            return false;
          }
        }

        if(this.filterData.category != '') {
          if(product.categoryId != this.filterData.category) {
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
          this.filteredBySearch = this.dataFromService.filter((product) => {
            return product.name.toLowerCase().includes(this.searchValue.toLowerCase());
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
          this.filteredBySearch = this.filteredByFilter.filter((product) => {
            return product.name.toLowerCase().includes(this.searchValue.toLowerCase());
          });
        }
      }
    }

    this.dataToShown = this.filteredBySearch;
    this.updatePagination();
  }

}
