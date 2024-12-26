import { Injectable } from '@angular/core';
import { UserType } from './user-type';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  setCurrentUser(data: UserType) {
    localStorage.setItem('currentUser', JSON.stringify(data));
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '');
  }
}
