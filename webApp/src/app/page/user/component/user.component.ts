import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { ExampleData } from '../../models/exampledata';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  standalone: false
})
export class UserComponent implements OnInit{

  dataFromService: ExampleData[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
      this.userService.get().subscribe(data => {
          this.dataFromService = data;
          console.log(this.dataFromService);
      });
  }
}
