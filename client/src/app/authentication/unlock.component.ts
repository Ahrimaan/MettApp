import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './authentication.service';

@Component({
  selector: 'app-unlock',
  template: '<div> Unlocking User </div>'
})
export class UnlockComponent {
  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router) {
    route.params.subscribe(param => {
      let id = param['id'];
      this.authService.unlockUser(id).subscribe(resp => {
        if (resp.status === 200) {
          this.router.navigate(['/login']);
        }
      });
    });
  }
}
