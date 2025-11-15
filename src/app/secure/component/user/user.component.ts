import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ToastrService } from 'ngx-toastr';
import { Observable, switchMap, tap } from 'rxjs';

import { Users } from '@app/core/models/user.model';
import { UserService } from '@app/secure/services/user.service';

import { UserUpdateComponent } from './user-update/user-update.component';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-user',
    standalone: false,
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
    userlist!: Users[];
    displayedColumns: string[] = ['username', 'name', 'email', 'phone', 'status', 'role', 'action'];
    datasource: any;

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    constructor(
        private userService: UserService,
        private toastr: ToastrService,
        private dialog: MatDialog
    ) {}

    ngOnInit(): void {
        this.loadUsers().subscribe();
    }

    loadUsers(): Observable<any> {
        return this.userService.getAllUsers().pipe(
            tap(item => {
                this.userlist = item;
                this.datasource = new MatTableDataSource<Users>(this.userlist);
                this.datasource.paginator = this.paginator;
                this.datasource.sort = this.sort;
            })
        );
    }

    updateRole(code: string): void {
        this.openPopup(code, 'role');
    }

    updateStatus(code: string): void {
        this.openPopup(code, 'status');
    }

    openPopup(username: string, type: string): void {
        this.dialog
            .open(UserUpdateComponent, {
                width: '30%',
                enterAnimationDuration: '1000ms',
                exitAnimationDuration: '1000ms',
                data: {
                    username: username,
                    type: type,
                },
            })
            .afterClosed()
            .pipe(
                switchMap(() => {
                    return this.loadUsers();
                })
            )
            .subscribe();
    }
}
