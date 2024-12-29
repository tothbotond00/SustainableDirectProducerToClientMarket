import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { ProducerData } from '@shared/models/producerData';
import { AuthService } from '@shared/common_services/auth.service';
import { UserDialogComponent } from '../dialog/user-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {ImageDialogComponent} from '../image-dialog/image-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  standalone: false
})
export class UserComponent implements OnInit{

  producer?: ProducerData;
  isOwn: boolean = true;

  constructor(private userService: UserService, private authService: AuthService, private dialog: MatDialog,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.userService.getProducerData(+params.get('id')!).subscribe(data => {
          if(!data.user.isCustomer) {
            console.log(data);
            this.producer = data;
            this.isOwn = !this.authService.isCustomer() && Number(this.authService.getUserId()) === Number(data.user.id);            
          }
          else {
            location.href = '/list';
          }
        });
      } else {
        this.refreshData();
      }
    });
  }

  refreshData() {
    this.userService.getProducerData(this.authService.getUserId()).subscribe(data => {
      console.log();
      this.isOwn = !this.authService.isCustomer() && Number(this.authService.getUserId()) === Number(data.user.id);
      this.producer = data;      
    });
  }

  editProfile() {
    const dialog = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: this.producer
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

  editPicture(i: number) {
    if (!this.isOwn) return;
    if (!this.producer) return;
    let url = '';
    if (i === 0) url = this.producer.image_Profile_Url;
    else if (i === 1) url = this.producer.image_One_Url;
    else if (i === 2) url = this.producer.image_Two_Url;
    else if (i === 3) url = this.producer.image_Three_Url;

    const dialog = this.dialog.open(ImageDialogComponent, {
      width: '500px',
      data: {url: url }
    });

    dialog.afterClosed().subscribe(result => {
      if(result) {
        const file = result as File;

        const formData = new FormData();
        formData.append('image', file);
        formData.append('imageID', i.toString());

        this.userService.post(this.authService.getUserId().toString() + '/image', formData).subscribe(data => {
          console.log(data);
          this.refreshData();
        });
      }
    });
  }
}
