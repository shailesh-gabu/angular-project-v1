import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  token: string | null = localStorage.getItem('authToken') || '';
  constructor(private router: Router) {}

  onLogout() {
    localStorage.removeItem('authToken');
    this.token = null;
    console.log('Logged out');
    this.router.navigateByUrl('login');
  }
}
