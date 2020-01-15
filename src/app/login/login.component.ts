import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showError = false;

  constructor(private Auth: AuthService, private _router: Router) { }

  ngOnInit() {

  }

  login(form) {

    this.Auth.login(form.value.email, form.value.password).subscribe(
      (data: any) => {

        localStorage.clear();
        localStorage.setItem('token', data.token);
        localStorage.setItem('refreshtoken', data.refresh_token);
        this._router.navigate(['/']);

        this.Auth.getProfile().subscribe(
          (profile: any) => {
            localStorage.setItem('profileemail', profile.email);
          }

        );
        this.showError = false;
      },
      (err) => {
        console.log('err', err);
        this.showError = true;

      }
    );

  }

}
