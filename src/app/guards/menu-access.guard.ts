import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { UserStoreService } from '@app/services/user.store.service';

@Injectable({
    providedIn: 'root',
})
export class AuthLoadGuard implements CanActivate {
    constructor(
        private userService: UserStoreService,
        private router: Router
    ) {}
    canActivate(): boolean {
        console.log('this.userService._menulist: ', this.userService._menulist());
        if (this.userService._menulist().length) {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}
