import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '@app/core/services/auth.service';

import { UserStoreService } from '../services/user.store.service';

//@Injectable({ providedIn: 'root' })

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const toastr = inject(ToastrService);
    const userService = inject(UserStoreService);
    const auth = inject(AuthService);

    console.log('state: ', state);

    let menuname = '';

    if (route.url.length > 0) {
        menuname = route.url[0].path;
    }

    console.log('AuthGuard: ');

    const userRole = auth.getUserRole();
    const userName = auth.getUserName();

    if (userName != '' && userRole) {
        //TODO remove subscribe
        if (menuname) {
            userService.Getmenupermission(userRole, menuname).subscribe(item => {
                console.log('item: ', item, menuname);
                if (item.haveview || menuname == 'app') {
                    return true;
                } else {
                    toastr.warning('Unauthorized access');
                    router.navigateByUrl('/');
                    return false;
                }
            });
            return true;
        }

        return true;
    } else {
        toastr.warning('Unauthorized access');
        router.navigate(['auth/login']);
        console.log('redirect login');
        return false;
    }
};
// export class AuthGuard implements CanActivate {
//     constructor(
//         private auth: AuthService,
//         private router: Router
//     ) {}

//     canActivate(): boolean {
//         if (this.auth.isLoggedIn()) {
//             return true;
//         }
//         this.router.navigate(['auth/login']);
//         console.log('redirect login');
//         return false;
//     }
// }
