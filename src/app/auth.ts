import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  username: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly SESSION_KEY = 'web-midterm-session';
  private readonly sessionSignal = signal<User | null>(this.getStoredSession());

  readonly session = this.sessionSignal.asReadonly();
  readonly isLoggedIn = () => this.session() !== null;

  constructor(private router: Router) {}

  private getStoredSession(): User | null {
    try {
      const raw = sessionStorage.getItem(this.SESSION_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as User;
    } catch {
      return null;
    }
  }

  login(username: string, password: string): boolean {
    if (!username.trim() || !password.trim()) {
      return false;
    }
    const user: User = { username: username.trim() };
    sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(user));
    this.sessionSignal.set(user);
    return true;
  }

  logout(): void {
    sessionStorage.removeItem(this.SESSION_KEY);
    this.sessionSignal.set(null);
    this.router.navigate(['/login']);
  }
}
