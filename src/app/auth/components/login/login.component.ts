import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of, switchMap, tap } from 'rxjs';

import { ApiResponse } from '@app/core/models/api-response';
import { UserCred } from '@app/core/models/user.model';
import { UserStoreService } from '@app/core/services/user.store.service';

interface LoginForm {
    username: FormControl<string>;
    password: FormControl<string>;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-login',
    standalone: false,
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
    loginform = new FormGroup<LoginForm>({
        username: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        password: new FormControl('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
    });

    response$?: Observable<ApiResponse>;

    constructor(
        private userService: UserStoreService,
        private toastr: ToastrService,
        private router: Router
    ) {}

    ngOnInit(): void {
        localStorage.clear();
        this.userService._menulist.set([]);
    }

    proceedlogin$(): Observable<ApiResponse> {
        if (!this.loginform.valid) return of();
        const formValue: UserCred = this.loginform.getRawValue();

        return this.userService.Proceedlogin(formValue).pipe(
            switchMap(user => {
                localStorage.setItem('token', user.token);
                localStorage.setItem('username', formValue.username);
                localStorage.setItem('userrole', user.userRole);

                console.log('user: ', user);

                return this.userService.LoadMenuByRole(user.userRole);
            }),
            tap(menuResponse => {
                console.log('menuResponse: ', menuResponse);
                this.userService._menulist.set(menuResponse);
                this.router.navigateByUrl('app/home');
            }),
            catchError(error => {
                console.error('error: ', error);
                this.toastr.error('Failed to login', `${error.error.title} ${error.error.status}`);
                return of(error);
            })
        );
    }
}
