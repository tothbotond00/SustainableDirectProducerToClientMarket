import { Component, OnInit } from '@angular/core';
import { ListService } from '../service/list.service';
import { Product } from '@shared/models/product';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FilterDialogComponent } from '../dialog/filter-dialog.component';
import { map, Observable, startWith } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: false
})
export class ListComponent implements OnInit{

  // Pagination properties
  paginatedProducts: Product[] = []; // Products to display on the current page
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 0;


  filterData: any = {};
  filteredProducts: Product[] = [];
  form: FormGroup;
  productControl: any;


  dataFromService: Product[] = [];

  constructor(private listService: ListService, private router: Router, private dialog: MatDialog,
    public formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      product: ['']
    });
  }

  ngOnInit(): void {
      this.listService.get().subscribe(data => {
          this.dataFromService = data;
          this.filteredProducts = this.dataFromService;
          this.updatePagination();
      });
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
  }

  // Navigate to a specific page
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  onSearchChange($event: any): void {
    if($event.target.value == '') {
      this.filteredProducts = this.dataFromService;
      this.updatePagination();
      return;
    }
    else {
      const searchValue = $event.target.value;
      this.filteredProducts = this.dataFromService.filter((product) => {
        return product.name.toLowerCase().includes(searchValue.toLowerCase());
      });
      this.updatePagination();
    }
  }

  getImage(): void {
    this.listService.getImage().subscribe(data => {
      console.log(data);
    });
  }

  // Redirect to the product page with the corresponding ID
  redirectToProduct(productId: number): void {
      this.router.navigate(['/product', productId]);
  }

  openFilter() {    

    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '400px',
      data: this.filterData
    });

    dialogRef.afterClosed().subscribe(result => {
      this.filterData = result;
      this.listService.get().subscribe(data => {
        this.dataFromService = data;
        this.applyFilter();
        this.form.get('product')?.setValue(this.form.get('product')?.value);
        this.updatePagination();
      });
    });
  }

  applyFilter() {

    if(this.filterData.priceAsc) {
      this.filteredProducts = this.filteredProducts.sort((a, b) => a.price - b.price);
    }

    this.filteredProducts = this.filteredProducts.filter((product) => {

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

}
