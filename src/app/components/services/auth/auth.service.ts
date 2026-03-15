import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/env/environment';
const { stage, backendHost } = environment;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(login: string, password: string): Observable<any> {
    return this.http.post(`${backendHost}/auth/login`, {
      login,
      password,
    });
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRoles(): string[] {
    const token = this.getToken();

    if (!token) return [];

    const payload = token.split('.')[1];

    const decoded = JSON.parse(atob(payload));
    console.log(decoded)
    return decoded.roles || [];
  }

  getUser(): string[] {
    const token = this.getToken();

    if (!token) return [];

    const payload = token.split('.')[1];

    const decoded = JSON.parse(atob(payload));
   
    return decoded.sub || [];
  }
}
