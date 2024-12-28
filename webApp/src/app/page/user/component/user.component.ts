import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { ProducerData } from '@shared/models/producerData';
import { AuthService } from '@shared/common_services/auth.service';
import { UserDialogComponent } from '../dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

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
  description: string = '';
  galleryImages: string[] = [
    '/assets/sample-product1.jpg',
    '/assets/sample-product2.jpg',
    '/assets/sample-product3.jpg'
  ];
  isProducer: boolean = false;

  dataFromService: ProducerData = new ProducerData();

  constructor(private userService: UserService, private authService: AuthService, private dialog: MatDialog, 
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.userService.getOne(params.get('id')!).subscribe(data => {
          if(!data.user.isCustomer) {

            console.log(data);
            this.isProducer = !this.authService.isCustomer();
            this.dataFromService = data;
            this.producerName = data.name;
            this.subtitle = data.profession;
            this.description = data.description;
          }
          else {
            location.href = '/list';
          }
        });
      } else {
        this.refreshData();
      }
    });



    //this.refreshData();
  }

  refreshData() {
    this.userService.getOne(this.authService.getUserId().toString()).subscribe(data => {
      console.log(data);
      
        this.isProducer = !this.authService.isCustomer();
        this.dataFromService = data;
        this.producerName = data.name;
        this.subtitle = data.profession;
        this.description = data.description;
    });
  }

  editProfile() {
    const dialog = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: this.dataFromService
    });

    dialog.afterClosed().subscribe(result => {
      if(result) {
        console.log(result);
        
        this.userService.put('', result).subscribe(data => {
          console.log(data);
          this.refreshData();
        });
      }
    });
  }
}
