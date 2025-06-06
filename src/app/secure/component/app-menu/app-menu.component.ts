import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';

import { menu } from '@app/models/user.model';
import { UserStoreService } from '@app/services/user.store.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-app-menu',
    templateUrl: './app-menu.component.html',
    styleUrl: './app-menu.component.scss',
    standalone: false,
})
export class AppMenuComponent implements OnInit {
    Loginuser = '';

    menulist$ = new Observable<menu[]>();

    showmenu: boolean = true;

    constructor(
        public userService: UserStoreService,
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private destroyRef: DestroyRef,
        private cdr: ChangeDetectorRef
    ) {
        // effect(() => {
        //     this.menulist = this.userService._menulist();
        // });
    }

    ngOnInit(): void {
        const userrole = localStorage.getItem('userrole') as string;

        this.menulist$ = this.userService.LoadMenuByRole(userrole);

        this.Loginuser = localStorage.getItem('username') as string;
        console.log('this.router.url: ', this.activatedRoute.snapshot);
    }

    logOut(): void {
        localStorage.clear();
        this.userService._menulist.set([]);
        this.router.navigate(['login']);
    }

    resetPassword(): void {
        this.router.navigate(['resetpassword']);
    }
}
