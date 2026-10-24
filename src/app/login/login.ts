import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private auth = inject(AuthService);
  private router = inject(Router);

  username = signal('');
  password = signal('');
  error = signal('');

  onSubmit(): void {
    const success = this.auth.login(this.username(), this.password());
    if (success) {
      this.error.set('');
      this.router.navigate(['/home']);
    } else {
      this.error.set('Please enter a username and password.');
    }
  }
}
