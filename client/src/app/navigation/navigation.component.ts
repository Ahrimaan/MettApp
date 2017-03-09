import { Component } from '@angular/core';
import { AuthService } from '../authentication';

@Component({
  selector: 'chm-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  public userName: string;
  public userProfileUrl: string;
  public isAdmin: boolean = false;

  constructor(private authService: AuthService) {
    authService.isAdmin.subscribe(result => {
      this.isAdmin = result;
    });
    authService.authenticated.subscribe(result => {
      if (result) {
        this.userName = this.authService.username;
        this.userProfileUrl = this.authService.avatarUrl;
      }
    });
  }

  logout() {
    this.authService.signOut();
  }
}
