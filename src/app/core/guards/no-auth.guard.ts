import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

//@Injectable({ providedIn: 'root' })

export const NoAuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
    const router = inject(Router);
    //const toastr = inject(ToastrService);
    //const service = inject(UserStoreService);
    //const auth = inject(AuthService);

    console.log('sadsa: ', state);

    console.log('router: ', route.routeConfig?.path);
    // if (!auth.isLoggedIn() || route.routeConfig?.path == 'login') {
    //     //toastr.warning('Unauthorized access');
    //     return true;
    // }

    router.navigate(['app/home']); // or whatever your main route is
    console.log('redirect');
    return false;
};
// export class NoAuthGuard implements CanActivate {
//     constructor(
//         private auth: AuthService,
//         private router: Router,
//         private activatedRoute: ActivatedRoute
//     ) {}

//     canActivate(route: ActivatedRouteSnapshot): boolean {
//         console.log('router: ', route.routeConfig?.path == 'login');
//         if (!this.auth.isLoggedIn() || route.routeConfig?.path == 'login') {
//             return true;
//         }
//         this.router.navigate(['app/home']); // or whatever your main route is
//         console.log('redirect');
//         return false;
//     }
// }
