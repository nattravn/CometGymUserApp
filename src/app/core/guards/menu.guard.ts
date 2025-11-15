import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '@app/core/services/auth.service';

import { UserStoreService } from '../services/user.store.service';

//@Injectable({ providedIn: 'root' })

export const MenuGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    const toastr = inject(ToastrService);
    const userService = inject(UserStoreService);
    const auth = inject(AuthService);

    console.log('state: ', state);

    let menuname;

    if (route.url.length > 0) {
        menuname = route.url[0].path;
    }

    const userRole = auth.getUserRole();
    const userName = auth.getUserName();

    console.log('userRole: ', userRole, 'userName: ', userName, 'menuname: ', route, 'state: ', state);

    if (userName) {
        //TODO remove subscribe
        if (menuname && userRole) {
            userService.Getmenupermission(userRole, menuname).subscribe(item => {
                console.log('item: ', item, menuname);
                if (item.haveview) {
                    return true;
                } else {
                    toastr.warning('Unauthorized access');
                    router.navigateByUrl('auth/login');
                    return false;
                }
            });
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
