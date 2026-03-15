import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DocumentService } from '../services/document/document.service';
import { HeaderComponent } from '../commons/header/header.component';

@Component({
  selector: 'app-dashboard',
  imports: [FormsModule, CommonModule, RouterModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(
  ) {}


 
}
