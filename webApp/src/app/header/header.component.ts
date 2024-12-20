import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '@shared/common_services/auth.service';
import { StartDialogComponent } from '../page/start/dialog/start-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: false
})
export class HeaderComponent implements OnInit{

  currentActiveLink: string = '/';

  hidden: boolean = false;
  username: string = '';

  constructor(public authService: AuthService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {    
    if(this.authService.isAuthenticated()) {
      this.hidden = false;
    }

    if(this.authService.isAuthenticated()) {
      this.username = this.authService.getUserName();
    }
  }

  /// Check the current route to display the correct header
  isLogin() {
    return this.router.url == '/';
  }

  /// Check the current route to activate the link
  isLinkActive(link: string) {
    return link == this.router.url.split('/')[1];
  }

  getStyle(link:string) {

    const backgroundColor = this.isLinkActive(link) ? '#E4E3E3' : '';
    const textColor = this.isLinkActive(link) ? 'black' : '';
    const textWeight = this.isLinkActive(link) ? '600' : '';

    return { 'background-color': backgroundColor, 'color': textColor, 'font-weight': textWeight};
  }

  redirectToSignup() {
    this.dialog.open(StartDialogComponent,
      {
        width: '500px',
        disableClose: true
      });
  }

  /// Logout the user and redirect to the home page
  onLogout() {
    this.router.navigate(['/']);
    this.authService.logout();
  }

  onSurveyEdit() {
    this.router.navigate(['/survey']);
  }

}
