import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';

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
    rolelist!: Roles[];
    menulist!: Menus[];
    accessarray!: FormArray<FormGroup<RoleMenuForm>>;
    useraccess!: MenuPermission;
    _response: any;

    roleMenuForm = new FormGroup<RoleMenuForm>({
        menucode: new FormControl<string>('', { nonNullable: true }),
        haveview: new FormControl<boolean>(false, { nonNullable: true }),
        haveadd: new FormControl<boolean>(false, { nonNullable: true }),
        haveedit: new FormControl<boolean>(false, { nonNullable: true }),
        havedelete: new FormControl<boolean>(false, { nonNullable: true }),
        userrole: new FormControl<string>('', { nonNullable: true }),
    });

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
        this.loadroles();
        this.loadmenus('');
    }

    addNewRow(input: Menus, _access: MenuPermission, role: string): void {
        const roleMenuForm = new FormGroup<RoleMenuForm>({
            menucode: new FormControl<string>(input.code, { nonNullable: true }),
            haveview: new FormControl<boolean>(_access.haveview, { nonNullable: true }),
            haveadd: new FormControl<boolean>(_access.haveadd, { nonNullable: true }),
            haveedit: new FormControl<boolean>(_access.haveedit, { nonNullable: true }),
            havedelete: new FormControl<boolean>(_access.havedelete, { nonNullable: true }),
            userrole: new FormControl<string>(role, { nonNullable: true }),
        });

        this.accessarray.push(roleMenuForm);
        console.log('input.code: ', this.accessarray.getRawValue());

        //this.roleForm.controls.access.setValue(this.accessarray.getRawValue());
    }

    loadroles(): void {
        this.service.getAllRoles().subscribe(item => {
            this.rolelist = item;
        });
    }

    rolechange(event: any): void {
        const selectedrole = event.value;
        this.loadmenus(selectedrole);
    }

    get getrows(): FormArray {
        console.log('this.roleForm.controls.access: ', this.roleForm.controls.access.controls);
        return this.roleForm.controls.access;
    }

    loadmenus(userrole: string): void {
        this.accessarray = this.roleForm.controls.access;

        this.accessarray.clear();

        console.log('this.accessarray: ', this.accessarray);
        //this.accessarray.clear();
        this.service.getAllMenus().subscribe(item => {
            this.menulist = item;
            console.log('item: ', item);
            if (this.menulist.length > 0) {
                this.menulist.map((o: Menus) => {
                    if (userrole != '') {
                        this.service.getMenuPermission(userrole, o.code).subscribe(item => {
                            this.useraccess = item;
                            console.log('userrole: ', userrole);
                            this.addNewRow(o, this.useraccess, userrole);
                        });
                    } else {
                        console.log('o: ', o.code);
                        this.addNewRow(
                            o,
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
                    }
                });
            }
        });
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
