import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwtHelper = new JwtHelperService();

  public isAuthenticated(): boolean {

    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(token);
  }
}