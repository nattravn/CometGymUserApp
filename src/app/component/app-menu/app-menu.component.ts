import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, effect, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';

import { filter, Observable } from 'rxjs';

import { MaterialModule } from '@app/material/material.module';
import { menu } from '@app/models/user.model';
import { UserStoreService } from '@app/services/user.store.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-app-menu',
    imports: [MaterialModule, RouterOutlet, RouterLink, CommonModule],
    templateUrl: './app-menu.component.html',
    styleUrl: './app-menu.component.scss',
})
export class AppMenuComponent implements OnInit {
    menulist!: menu[];
    Loginuser = '';

    menulist$ = new Observable<menu[]>();

    showmenu: boolean = true;

    constructor(
        public userService: UserStoreService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private destroyRef: DestroyRef
    ) {
        effect(() => {
            this.menulist = this.userService._menulist();
        });
    }

    ngOnInit(): void {
        const userrole = localStorage.getItem('userrole') as string;
        this.menulist$ = this.userService.LoadMenuByRole(userrole);

        this.Loginuser = localStorage.getItem('username') as string;
        console.log('this.router.url: ', this.activatedRoute.snapshot);

        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe((event: NavigationEnd) => {
                this.setAccess(event.urlAfterRedirects);
            });
    }

    logOut(): void {
        this.router.navigate(['login']);
    }

    resetPassword(): void {
        this.router.navigate(['resetpassword']);
    }

    setAccess(currentUrl: string): void {
        //const userrole = localStorage.getItem('userrole') as string;

        console.log('currentUrl: ', currentUrl);
        if (
            currentUrl == '/register' ||
            currentUrl == '/login' ||
            currentUrl == '/resetpassword' ||
            currentUrl == '/forgetpassword'
        ) {
            this.showmenu = false;
        } else {
            this.showmenu = true;
        }
    }
}
