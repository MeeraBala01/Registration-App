import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { UserService } from '../user.service';
import { UserType } from '../user-type';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  imports: [
    HeaderComponent,
    RouterLink,
    CommonModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  userData: any;
  currentUser: any;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('angularLocal') || '{}');
    this.currentUser = this.userService.getCurrentUser();
  }

  clear() {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }

  deleteAccount(mobile: string) {
    if (
      confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    ) {
      this.userData = this.userData.filter((element: UserType) => {
        return element.mobile != mobile;
      });
      localStorage.setItem('angularLocal', JSON.stringify(this.userData));
      alert('Your account has been deleted successfully.');
      this.router.navigate(['/exit']);
    }
  }
}
