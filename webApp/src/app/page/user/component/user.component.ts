import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { ExampleData } from '../../../shared/models/exampledata';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  standalone: false
})
export class UserComponent implements OnInit{

  // Fixed data for now, can be replaced with dynamic data from APIs later
  producerName: string = 'John Doe';
  subtitle: string = 'Passionate Producer | Organic Goods Supplier';
  profilePicture: string = '/assets/default-profile.jpg';
  introduction: string = `
    Hello! I am John Doe, a producer of high-quality organic products, dedicated to sustainable and eco-friendly farming practices.
    My goal is to bring fresh, healthy, and delicious goods to your table while caring for the environment.
  `;
  galleryImages: string[] = [
    '/assets/sample-product1.jpg',
    '/assets/sample-product2.jpg',
    '/assets/sample-product3.jpg'
  ];

  dataFromService: ExampleData[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
      this.userService.get().subscribe(data => {
          this.dataFromService = data;
          console.log(this.dataFromService);
      });
  }
}
