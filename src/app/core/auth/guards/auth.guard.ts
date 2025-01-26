import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import {AuthService} from "../auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate
{
  constructor(
    private router: Router,
    //private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return  true;
    const currentUser = '';
    if (currentUser) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/sign-in'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
