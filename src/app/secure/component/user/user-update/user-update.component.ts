import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { ToastrService } from 'ngx-toastr';
import { EMPTY, Observable, tap } from 'rxjs';

import { ApiResponse } from '@app/core/models/api-response';
import { Roles, UpdateUser, Users } from '@app/core/models/user.model';
import { UserService } from '@app/secure/services/user.service';

interface UserForm {
    userName: FormControl<string>;
    userRole: FormControl<string>;
    status: FormControl<boolean>;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-user-update',
    standalone: false,
    templateUrl: './user-update.component.html',
    styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent implements OnInit {
    dialogdata: any;
    userdata!: Users;
    rolelist!: Roles[];
    type = '';
    _response: any;
    userForm = new FormGroup<UserForm>({
        userName: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        userRole: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
        status: new FormControl<boolean>(true, { nonNullable: true }),
    });
    constructor(
        private builder: FormBuilder,
        private toastr: ToastrService,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private userService: UserService,
        private ref: MatDialogRef<UserUpdateComponent>
    ) {}

    ngOnInit(): void {
        this.loadroles();
        this.dialogdata = this.data;
        this.type = this.dialogdata.type;
        console.log(this.dialogdata);
        if (this.dialogdata.username !== '') {
            this.userService.getUserByCode(this.dialogdata.username).subscribe(item => {
                this.userdata = item;

                this.userForm.setValue({
                    userName: this.userdata.username,
                    userRole: this.userdata.role,
                    status: this.userdata.isactive,
                });
            });
        }
    }

    loadroles(): void {
        this.userService.getAllRoles().subscribe(item => {
            this.rolelist = item;
        });
    }

    proceedchange(): Observable<ApiResponse> {
        if (this.userForm.valid) {
            const userFormValue: UpdateUser = this.userForm.getRawValue();

            console.log('userFormValue: ', userFormValue);

            if (this.type === 'role') {
                return this.userService.updateRole(userFormValue).pipe(
                    tap(item => {
                        this._response = item;
                        if (item.result === 'pass') {
                            this.toastr.success('Updated successfully', 'Role Update');
                            this.closepopup();
                        } else {
                            this.toastr.error(`Failed due to : ${item.message}`, 'Role Update');
                        }
                    })
                );
            } else {
                return this.userService.updateStatus(userFormValue).pipe(
                    tap(item => {
                        this._response = item;
                        if (item.result === 'pass') {
                            this.toastr.success('Updated successfully', 'Status Update');
                            this.closepopup();
                        } else {
                            this.toastr.error(`Failed due to : ${item.message}`, 'Status Update');
                        }
                    })
                );
            }
        }

        // If form is invalid, return EMPTY observable so caller can still subscribe safely
        return EMPTY;
    }

    closepopup(): void {
        this.ref.close();
    }
}
