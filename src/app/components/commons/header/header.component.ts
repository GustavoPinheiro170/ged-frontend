import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

   userName = "";
   noHasPermission:boolean = false;

  constructor(private router: Router,
   private auth: AuthService
  ) {}

  ngOnInit() {
    this.getPermission()
    console.log(this.noHasPermission)
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);

  }

  getUser() {
    return this.auth.getUser();
  }
  getPermission() {
    this.noHasPermission =  !this.auth.getRoles().some((roles) => roles == "ADMIN")
  }
}
