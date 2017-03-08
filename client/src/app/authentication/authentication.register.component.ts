import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './authentication.service';

@Component({
  selector: 'chm-register-user',
  templateUrl: './authentication.register.component.html',
  styleUrls: ['./authentication.component.css']
})
export class RegisterUserComponent implements OnInit {
  private errorMessage: any;

  constructor(public router: Router, public af: AuthService) {}

  ngOnInit() {
    this.af.authenticationError.subscribe(err => { this.errorMessage = err; });
  }

  register(mail, password, fullname){
     this.errorMessage = '';
      this.af.createUserAccount(mail, password, fullname).subscribe(res => {
        if (res.status === 200) {
          this.router.navigateByUrl('/login');
        }

      }, error => {
          this.errorMessage = error._body;
      });
  }

}
