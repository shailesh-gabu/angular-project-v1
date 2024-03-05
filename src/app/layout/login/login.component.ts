import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  name: any = '';
  password: any = '';
  constructor(private router:Router) {}

  onLogin() {
    if((this.name = 'gabu') && (this.password = '123')) {
      this.router.navigateByUrl('home')
    }
  }
}
