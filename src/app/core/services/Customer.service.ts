import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@environments/environment.development';

import { Customer } from '../models/customer.model';

@Injectable({
    providedIn: 'root',
})
export class CustomerService {
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}

    getAll(): Observable<Customer[]> {
        return this.http.get<Customer[]>(`${this.baseUrl}customer/getall`);
    }
}
