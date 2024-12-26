import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { RouterLink, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { UserService } from '../user.service';
import { UserType } from '../user-type';

@Component({
  selector: 'app-main-page',
  imports: [HeaderComponent, RouterLink, ReactiveFormsModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  standalone: true,
})
export class MainPageComponent {
  loginForm: FormGroup = new FormGroup({
    mobile: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private userService: UserService, private router: Router) {}

  onLogin() {
    if (this.loginForm.valid) {
      const isLocalData = localStorage.getItem('angularLocal');
      if (isLocalData != null) {
        const users = JSON.parse(isLocalData);

        const currentUser = users.find(
          (m: UserType) =>
            m.mobile === this.loginForm.value.mobile &&
            m.password === this.loginForm.value.password
        );

        if (currentUser) {
          this.userService.setCurrentUser(currentUser);

          this.router.navigate(['/dash']);
        } else {
          alert('Invalid mobile number or password!');
        }
      } else {
        alert('No users found. Please sign up first.');
      }
    } else {
      alert('Please enter valid credentials.');
    }
  }
}
