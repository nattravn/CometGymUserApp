import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Customer } from '@app/core/models/customer.model';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    selector: 'app-custumer',
    templateUrl: './custumer.component.html',
    styleUrls: ['./custumer.component.css'],
    standalone: false,
})
export class CustumerComponent implements OnInit {
    customerList: Customer[] = [];
    displayedColumns: string[] = ['code', 'name', 'email', 'phone', 'creditlimit', 'status', 'action'];
    datasource: any;
    constructor() {}

    ngOnInit(): void {
        this.loadCustomer();
    }

    loadCustomer(): void {
        // this.customerService.getAll().subscribe(item => {
        //     this.customerList = item;
        //     this.datasource = new MatTableDataSource<Customer>(this.customerList);
        // });
    }
}
