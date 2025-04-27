import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@environments/environment.development';

import { ApiResponse } from '@app/models/api-response';
import { UserRegistration } from '@app/models/user.model';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) {}

    UserRegistartion(_data: UserRegistration): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.baseUrl}User/userregistration`, _data);
    }
}
