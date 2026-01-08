import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { distinctUntilChanged, forkJoin, map, Observable, of, switchMap, tap } from 'rxjs';

import { ApiResponse } from '@app/core/models/api-response';
import { MenuPermission, Menus, Roles } from '@app/core/models/user.model';
import { UserService } from '@app/secure/services/user.service';

interface RoleMenuForm {
    menucode: FormControl<string>;
    haveview: FormControl<boolean>;
    haveadd: FormControl<boolean>;
    haveedit: FormControl<boolean>;
    havedelete: FormControl<boolean>;
    userrole: FormControl<string>;
}

interface RoleForm {
    userrole: FormControl<string>;
    access: FormArray<FormGroup<RoleMenuForm>>;
}

@Component({
    selector: 'app-user-role',
    templateUrl: './user-role.component.html',
    styleUrls: ['./user-role.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class UserRoleComponent implements OnInit {
    rolelist$ = new Observable<Roles[]>();

    roleForm = new FormGroup<RoleForm>({
        userrole: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        access: new FormArray<FormGroup<RoleMenuForm>>([]),
    });

    trackByIndex: (i: number) => number = (i: number) => i;

    readonly accessArray$ = this.roleForm.controls.userrole.valueChanges.pipe(
        distinctUntilChanged(),
        switchMap(role => this.loadmenus(role)),
        tap(accessArray => {
            this.roleForm.setControl('access', accessArray);
        })
    );

    constructor(
        private toastr: ToastrService,
        private service: UserService
    ) {}
    ngOnInit(): void {
        this.rolelist$ = this.service.getAllRoles();
    }

    addNewRow(input: Menus, access: MenuPermission, role: string): FormGroup<RoleMenuForm> {
        return new FormGroup<RoleMenuForm>({
            menucode: new FormControl<string>(input.code, { nonNullable: true }),
            haveview: new FormControl<boolean>(access.haveview, { nonNullable: true }),
            haveadd: new FormControl<boolean>(access.haveadd, { nonNullable: true }),
            haveedit: new FormControl<boolean>(access.haveedit, { nonNullable: true }),
            havedelete: new FormControl<boolean>(access.havedelete, { nonNullable: true }),
            userrole: new FormControl<string>(role, { nonNullable: true }),
        });
    }

    get getrows(): FormArray {
        return this.roleForm.controls.access;
    }

    loadmenus(userrole: string): Observable<FormArray<FormGroup<RoleMenuForm>>> {
        return this.service.getAllMenus().pipe(
            switchMap(menus => {
                if (!menus.length) {
                    return of(new FormArray<FormGroup<RoleMenuForm>>([]));
                }

                return forkJoin(
                    menus.map(menu =>
                        this.service
                            .getMenuPermission(userrole, menu.code)
                            .pipe(map(permission => this.addNewRow(menu, permission, userrole)))
                    )
                ).pipe(switchMap(rows => of(new FormArray<FormGroup<RoleMenuForm>>(rows))));
            })
        );
    }

    saveroles(): Observable<ApiResponse> {
        if (this.roleForm.valid) {
            const access: MenuPermission[] = this.roleForm.getRawValue().access;
            console.log('access: ', access);
            return this.service.assigRolePermission(access).pipe(
                tap(item => {
                    if (item.result === 'pass') {
                        this.toastr.success('Permission assigned successfully', 'Saved');
                    } else {
                        this.toastr.error(`Failed due to : ${item.message}`, 'Menu access assignment');
                    }
                })
            );
        } else {
            this.toastr.error('Form is invalid, please check the input data', 'Error');
            return of({ result: 'fail', message: 'Form is invalid', responseCode: 400 });
        }
    }
}
