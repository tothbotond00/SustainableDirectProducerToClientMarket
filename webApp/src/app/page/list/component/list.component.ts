import { Component, OnInit } from '@angular/core';
import { ListService } from '../service/list.service';
import { ExampleData } from '../../models/exampledata';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
  standalone: false
})
export class ListComponent implements OnInit{

  // Mock product data
  products = [
    { id: 1, name: 'Organic Honey', price: 15.99, image: '/assets/honey.jpg' },
    { id: 2, name: 'Fresh Almonds', price: 12.49, image: '/assets/honey.jpg' },
    { id: 3, name: 'Artisan Bread', price: 5.99, image: '/assets/honey.jpg' },
    { id: 4, name: 'Organic Milk', price: 4.99, image: '/assets/honey.jpg' },
    { id: 5, name: 'Homemade Jam', price: 8.99, image: '/assets/honey.jpg' },
    { id: 6, name: 'Farm Fresh Eggs', price: 6.49, image: '/assets/honey.jpg' },
    { id: 7, name: 'Cheddar Cheese', price: 14.99, image: '/assets/honey.jpg' },
    { id: 8, name: 'Herbal Tea', price: 9.99, image: '/assets/honey.jpg' },
    { id: 9, name: 'Baked Cookies', price: 10.99, image: '/assets/honey.jpg' },
    { id: 10, name: 'Natural Yogurt', price: 5.49, image: '/assets/honey.jpg' }
  ];

  // Pagination properties
  paginatedProducts: any[] = []; // Products to display on the current page
  currentPage: number = 1;
  itemsPerPage: number = 9;
  totalPages: number = 0;


  dataFromService: ExampleData[] = [];

  constructor(private listService: ListService) {  }

  ngOnInit(): void {
      this.updatePagination();
      this.listService.get().subscribe(data => {
          this.dataFromService = data;
          console.log(this.dataFromService);
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

  // Redirect to the product page with the corresponding ID
  redirectToProduct(productId: number): void {
      //redirect  
  }
}
