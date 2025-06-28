import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
    getUserName(): string | null {
        return localStorage.getItem('username');
    }

    getUserRole(): string | null {
        return localStorage.getItem('userrole');
    }

    login(token: string): void {
        localStorage.setItem('access_token', token);
    }

    logout(): void {
        localStorage.removeItem('access_token');
    }
}
