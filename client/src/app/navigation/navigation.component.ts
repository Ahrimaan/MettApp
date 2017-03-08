import { Component } from '@angular/core';
import { AuthService } from '../authentication';

@Component({
  selector: 'chm-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent{

  public userName: string;
  public userProfileUrl: string;

  constructor(private authService: AuthService) {
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
