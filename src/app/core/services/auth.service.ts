import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    login(token: string): void {
        localStorage.setItem('access_token', token);
    }

    logout(): void {
        localStorage.removeItem('access_token');
    }
}
