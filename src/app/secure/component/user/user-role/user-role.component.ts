import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { EMPTY, forkJoin, map, Observable, of, switchMap } from 'rxjs';

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
    accessarray = new FormArray<FormGroup<RoleMenuForm>>([]);
    _response: any;

    // roleMenuForm = new FormGroup<RoleMenuForm>({
    //     menucode: new FormControl<string>('', { nonNullable: true }),
    //     haveview: new FormControl<boolean>(false, { nonNullable: true }),
    //     haveadd: new FormControl<boolean>(false, { nonNullable: true }),
    //     haveedit: new FormControl<boolean>(false, { nonNullable: true }),
    //     havedelete: new FormControl<boolean>(false, { nonNullable: true }),
    //     userrole: new FormControl<string>('', { nonNullable: true }),
    // });

    roleForm = new FormGroup<RoleForm>({
        userrole: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        access: new FormArray<FormGroup<RoleMenuForm>>([]),
    });

    constructor(
        private builder: FormBuilder,
        private toastr: ToastrService,
        private service: UserService
    ) {}

    ngOnInit(): void {
        this.loadmenus('').subscribe();
        this.rolelist$ = this.service.getAllRoles().pipe(
            map(item => {
                return item;
            })
        );
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

        this.accessarray.push(roleMenuForm);

        return roleMenuForm;
        //this.roleForm.controls.access.setValue(this.accessarray.getRawValue());
    }

    rolechange(event: any): void {
        const selectedrole = event.value;
        this.loadmenus(selectedrole).subscribe();
    }

    get getrows(): FormArray {
        console.log('this.roleForm.controls.access: ', this.roleForm.controls.access.controls);
        return this.roleForm.controls.access;
    }

    loadmenus(userrole: string): Observable<FormArray<FormGroup<RoleMenuForm>>> {
        this.accessarray = this.roleForm.controls.access;

        this.accessarray.clear();

        return this.service.getAllMenus().pipe(
            switchMap((menus: Menus[]) => {
                if (menus.length > 0) {
                    const menuPermissions$ = menus.map((menu: Menus) => {
                        if (userrole != '') {
                            return this.service.getMenuPermission(userrole, menu.code);
                        } else {
                            this.addNewRow(
                                menu,
                                {
                                    menucode: '',
                                    userrole: '',
                                    haveview: false,
                                    haveadd: false,
                                    haveedit: false,
                                    havedelete: false,
                                },
                                ''
                            );
                            return EMPTY;
                        }
                    });

                    return forkJoin(menuPermissions$).pipe(
                        switchMap((permissions: MenuPermission[]) => {
                            const accessarray = new FormArray<FormGroup<RoleMenuForm>>([]);
                            permissions.forEach((permission: MenuPermission) => {
                                menus.forEach((menu: Menus) => {
                                    if (permission.menucode === menu.code) {
                                        this.addNewRow(menu, permission, userrole);
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
                this._response = item;
                if (this._response.result == 'pass') {
                    this.toastr.success('Permission assigned successfully', 'Saved');
                } else {
                    this.toastr.error(`Failed due to : ${this._response.message}`, 'Menu access assignment');
                }
            });
        }
    }
}
