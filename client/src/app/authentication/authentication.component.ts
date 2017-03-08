import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './authentication.service';

@Component({
  selector: 'chm-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  @Output() public errorMessage: string;

  constructor(public router: Router, public authService: AuthService) {
      authService.authenticationError.subscribe(err => {
            this.errorMessage = err;
      });

      authService.authenticated.subscribe(data => {
        if (data) {
          this.router.navigateByUrl('/home');
        }
      })
  }



  ngOnInit() {
  }

  login(mail, password) {
    this.errorMessage = '';
    this.authService.signInWithMail(mail, password);
  }

  loginWithGithub() {
    this.authService.signIn('Github');
  }

  loginWithAmazon() {
    this.authService.signIn('Amazon');
  }

  loginWithGoogle() {
    this.authService.signIn('Google');
  }

  loginWithLinkedIn() {
    this.authService.signIn('LinkedIn');
  }

  navigateToHome() {
    this.router.navigateByUrl('/home');
  }
}
