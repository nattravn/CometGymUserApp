import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@environments/environment.development';

import { ApiResponse } from '@app/core/models/api-response';
import { Customer } from '@app/core/models/customer.model';

@Injectable()
export class CustomerService {
    constructor(private http: HttpClient) {}

    baseUrl = environment.apiUrl;

    getAll(): Observable<Customer[]> {
        return this.http.get<Customer[]>(`${this.baseUrl}Customer/GetAll`);
    }

    getByCode(code: string): Observable<Customer> {
        return this.http.get<Customer>(`${this.baseUrl}Customer/Getbycode?code=${code}`);
    }

    createCustomer(_data: Customer): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.baseUrl}Customer/create`, _data);
    }

    updateCustomer(_data: Customer): Observable<ApiResponse> {
        return this.http.put<ApiResponse>(`${this.baseUrl}Customer/Update?code=${_data.code}`, _data);
    }

    deleteCustomer(code: string): Observable<ApiResponse> {
        return this.http.delete<ApiResponse>(`${this.baseUrl}Customer/Remove?code=${code}`);
    }
}
