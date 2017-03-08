import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { AuthService } from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate{

    constructor(protected router: Router, protected authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        // Check against API
         return true;
    }
}
