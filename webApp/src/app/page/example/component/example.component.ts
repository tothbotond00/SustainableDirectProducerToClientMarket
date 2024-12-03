import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../service/example.service';
import { ExampleData } from '../../models/exampledata';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrl: './example.component.scss',
  standalone: false
})
export class ExampleComponent implements OnInit{

  dataFromService: ExampleData[] = [];

  constructor(private exampleService: ExampleService) { }

  ngOnInit(): void {
      this.exampleService.get().subscribe(data => {
          this.dataFromService = data;
          console.log(this.dataFromService);
      });
  }
}
