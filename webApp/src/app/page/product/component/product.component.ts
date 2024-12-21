import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product.service';
import { ExampleData } from '../../models/exampledata';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  standalone: false
})
export class ProductComponent implements OnInit{

  dataFromService: ExampleData[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
      this.productService.get().subscribe(data => {
          this.dataFromService = data;
          console.log(this.dataFromService);
      });
  }
}