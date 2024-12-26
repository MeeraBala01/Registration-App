import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';
import { UserService } from '../../user.service';
import { UserType } from '../../user-type';

@Component({
  selector: 'app-sign-up-page',
  imports: [ReactiveFormsModule, HeaderComponent, RouterLink],
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.css'],
})
export class SignUpPageComponent {
  userForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
      Validators.minLength(10),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=[^A-Z]*[A-Z])(?=[^a-z]*[a-z])(?=\D*\d)(?=[^!@#$%^&*()_+=[\]{}|;:'",.<>?/]*[!@#$%^&*()_+=[\]{}|;:'",.<>?/])(?!.*\s).{7,}$/
      ),
    ]),
  });

  constructor(private router: Router, private userService: UserService) {}

  userRegisterObj: UserType = {
    name: '',
    mobile: '',
    email: '',
    password: '',
  };

  // router = inject(Router);

  onRegister() {
    if (this.userForm.valid) {
      const newUser = this.userForm.value;

      const isLocalData = localStorage.getItem('angularLocal');
      if (isLocalData != null) {
        const localArray = JSON.parse(isLocalData);
        localArray.push(newUser);
        localStorage.setItem('angularLocal', JSON.stringify(localArray));
        this.userService.setCurrentUser(newUser);
      } else {
        const localArray = [];
        localArray.push(this.userRegisterObj);
        localStorage.setItem('angularLocal', JSON.stringify(localArray));
      }

      alert('Successfully Registered!');
      this.router.navigate(['/dash'], {
        state: { userData: this.userRegisterObj },
      });
    } else {
      alert('Please fill out all required fields correctly.');
      this.router.navigate([' ']);
    }
  }
}
