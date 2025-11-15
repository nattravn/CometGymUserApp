import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, Observable, of, switchMap, tap } from 'rxjs';

import { Customer } from '@app/core/models/customer.model';
import { MenuPermission } from '@app/core/models/user.model';
import { UserStoreService } from '@app/core/services/user.store.service';

import { CustomerService } from './service/customer.service';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss'],
    standalone: false,
})
export class CustomerComponent implements OnInit {
    customerList: Customer[] = [];
    displayedColumns: string[] = ['code', 'name', 'email', 'phone', 'creditlimit', 'status', 'action'];
    datasource = new MatTableDataSource<Customer>([]);
    _response: any;
    _permission: MenuPermission = {
        menucode: '',
        userrole: '',
        haveview: false,
        haveadd: false,
        haveedit: false,
        havedelete: false,
    };

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    constructor(
        private customerService: CustomerService,
        private userservice: UserStoreService,
        private toastr: ToastrService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.setAccess().subscribe();
        this.loadCustomer().subscribe();
    }

    setAccess(): Observable<MenuPermission> {
        const role = localStorage.getItem('userrole') as string;
        return this.userservice.Getmenupermission(role, 'customer').pipe(
            tap(item => {
                console.log('item: ', item);
                this._permission = item;
                console.log(this._permission);
            })
        );
    }

    loadCustomer(): Observable<Customer[]> {
        return this.customerService.getAll().pipe(
            tap(item => {
                this.customerList = item;
                console.log('this.paginator: ', this.paginator);
                this.datasource = new MatTableDataSource<Customer>(this.customerList);
                this.datasource.paginator = this.paginator;
                this.datasource.sort = this.sort;
            })
        );
    }

    edit(code: string): void {
        if (this._permission.haveedit) {
            this.router.navigateByUrl(`app/customer/edit/${code}`);
        } else {
            this.toastr.warning('User not having edit access', 'warning');
        }
    }

    delete(code: string): Observable<Customer[]> {
        console.log('this._permission.havedelete: ', this._permission.havedelete);
        if (this._permission.havedelete) {
            if (confirm('Are you sure?')) {
                return this.customerService.deleteCustomer(code).pipe(
                    switchMap(item => {
                        this._response = item;
                        console.log('item: ', item);
                        if (this._response.result === 'pass') {
                            this.toastr.success('Deleted successfully', 'Success');
                            return this.loadCustomer();
                        } else {
                            this.toastr.error(`Due to:${this._response.message}`, 'Failed');
                            return EMPTY;
                        }
                    }),
                    catchError((e: HttpErrorResponse) => {
                        console.log('e: ', e);
                        if (e.status === HttpStatusCode.MethodNotAllowed) {
                            this.toastr.error(`Due to:${e.message}`, 'Failed');
                        }
                        return of();
                    })
                );
            }
        } else {
            this.toastr.warning('User not having delete access', 'warning');
        }

        return of();
    }
}
