import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { distinctUntilChanged, forkJoin, Observable, of, switchMap } from 'rxjs';

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
    styleUrls: ['./user-role.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,
})
export class UserRoleComponent implements OnInit {
    rolelist$ = new Observable<Roles[]>();
    accessFormArray = new FormArray<FormGroup<RoleMenuForm>>([]);

    roleForm = new FormGroup<RoleForm>({
        userrole: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        access: new FormArray<FormGroup<RoleMenuForm>>([]),
    });

    constructor(
        private builder: FormBuilder,
        private toastr: ToastrService,
        private service: UserService,
        private cdr: ChangeDetectorRef
    ) {}
    ngOnInit(): void {
        this.rolelist$ = this.service.getAllRoles();

        this.roleForm.controls.userrole.valueChanges
            .pipe(
                distinctUntilChanged(),
                switchMap(role => this.loadmenus(role))
            )
            .subscribe(_ => {
                //this.setAccessFormArray(menus);
                this.cdr.markForCheck();
            });
    }

    addNewRow(input: Menus, _access: MenuPermission, role: string): FormGroup<RoleMenuForm> {
        const roleMenuForm = new FormGroup<RoleMenuForm>({
            menucode: new FormControl<string>(input.code, { nonNullable: true }),
            haveview: new FormControl<boolean>(_access.haveview, { nonNullable: true }),
            haveadd: new FormControl<boolean>(_access.haveadd, { nonNullable: true }),
            haveedit: new FormControl<boolean>(_access.haveedit, { nonNullable: true }),
            havedelete: new FormControl<boolean>(_access.havedelete, { nonNullable: true }),
            userrole: new FormControl<string>(role, { nonNullable: true }),
        });

        this.accessFormArray.push(roleMenuForm);

        return roleMenuForm;
    }

    get getrows(): FormArray {
        return this.roleForm.controls.access;
    }

    loadmenus(userrole: string): Observable<FormArray<FormGroup<RoleMenuForm>>> {
        this.accessFormArray = this.roleForm.controls.access;

        this.accessFormArray.clear();

        return this.service.getAllMenus().pipe(
            switchMap((menus: Menus[]) => {
                if (menus.length > 0) {
                    const menuPermissions$ = menus.map((menu: Menus) => {
                        return this.service.getMenuPermission(userrole, menu.code);
                    });

                    return forkJoin(menuPermissions$).pipe(
                        switchMap((permissions: MenuPermission[]) => {
                            const accessarray = new FormArray<FormGroup<RoleMenuForm>>([]);
                            permissions.forEach((permission: MenuPermission) => {
                                menus.forEach((menu: Menus) => {
                                    if (permission.menucode === menu.code) {
                                        accessarray.push(this.addNewRow(menu, permission, userrole));
                                    }
                                });
                            });
                            return of(accessarray);
                        })
                    );
                }
                return of(new FormArray<FormGroup<RoleMenuForm>>([]));
            })
        );
    }

    Saveroles(): void {
        if (this.roleForm.valid) {
            const access: MenuPermission[] = this.roleForm.getRawValue().access;
            console.log('access: ', access);
            this.service.assigRolePermission(access).subscribe(item => {
                if (item.result == 'pass') {
                    this.toastr.success('Permission assigned successfully', 'Saved');
                } else {
                    this.toastr.error(`Failed due to : ${item.message}`, 'Menu access assignment');
                }
            });
        }
    }
}
