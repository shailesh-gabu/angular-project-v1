import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  token: string | null = localStorage.getItem('authToken') || '';

  name: any = '';
  password: any = '';

  constructor(private router: Router) {}

  generateToken(length: number): string {
    let jwtToken = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      jwtToken += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }
    return jwtToken;
  }

  onLogin() {
    if (this.name == 'gabu' && this.password == '123') {
      const randomToken = this.generateToken(32);
      localStorage.setItem('authToken', randomToken);
      this.token = randomToken;
      console.log('Token:', this.token);
      this.router.navigateByUrl('home');
    } else {
      alert('user name and password not match');
    }
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }
}
