import { Component, inject } from '@angular/core';
import { AuthService } from '../auth';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  auth = inject(AuthService);

  logout(): void {
    this.auth.logout();
  }
}
