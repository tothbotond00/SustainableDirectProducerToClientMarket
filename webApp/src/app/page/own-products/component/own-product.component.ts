import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-own-product',
  templateUrl: './own-product.component.html',
  styleUrl: './own-product.component.scss',
  standalone: false
})
export class OwnProductComponent implements OnInit{

  isActive = true;
  constructor() { }

  ngOnInit(): void {
  }
  

}