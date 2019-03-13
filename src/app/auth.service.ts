import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor() { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ){
    return localStorage.getItem('access_token')?true:false
  }
}