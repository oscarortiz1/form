import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  saveUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}
