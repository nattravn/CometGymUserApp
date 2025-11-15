import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../services/auth.service';
import { UserStoreService } from '../services/user.store.service';

//@Injectable({ providedIn: 'root' })

export const SigInGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
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

    console.log('userRole: ', userRole, 'userName: ', userName, 'menuname: ', menuname, 'state: ', state);

    if (route.url.length && state.url === '') {
        router.navigateByUrl('auth/login');
        return false;
    }

    if (userName) {
        //TODO remove subscribe
        if (userRole) {
            userService.Getmenupermission(userRole, 'home').subscribe(item => {
                console.log('item: ', item);
                if (item.haveview) {
                    return true;
                } else {
                    console.log('state.url: ', state.url);
                    toastr.warning('Unauthorized access');
                    router.navigateByUrl('auth/login');
                    return false;
                }
            });
        }

        return true;
    } else {
        if (state.url !== '/' && state.url !== '/auth/login') {
            toastr.warning('Unauthorized access');
        }

        router.navigate(['auth/login']);
        console.log('redirect login');
        return false;
    }
};
