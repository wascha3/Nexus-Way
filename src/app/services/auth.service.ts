import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private _router: Router) { }


  login(email, password) {

    const login = {
      email,
      password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const options = { headers };

    return this.http.post('https://pacific-caverns-84912.herokuapp.com/api/login', login, options);
  }

  getProfile() {

    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'Content-type': 'application/json'
    });

    const options = { headers };

    return this.http.get('https://pacific-caverns-84912.herokuapp.com/api/profile', options);
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }

  isConnected() {
    return !!localStorage.getItem('token');

  }
}
