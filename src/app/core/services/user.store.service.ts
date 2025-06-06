import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import { Observable, ReplaySubject, tap } from 'rxjs';

import { environment } from '@environments/environment.development';

import { ApiResponse } from '@app/core/models/api-response';
import {
    loginResp,
    menu,
    RegisterConfirm,
    ResetPasswordFormModel,
    userCred,
    UserRegistration,
} from '@app/core/models/user.model';

@Injectable({
    providedIn: 'root',
})
export class UserStoreService {
    baseUrl = environment.apiUrl;

    registerResponse = signal<RegisterConfirm>({
        userid: 0,
        username: '',
        otptext: '',
    });

    _menulist = signal<menu[]>([]);
    _username = signal<string>('');

    private _menulist$ = new ReplaySubject<menu[]>(1);
    public menulist$ = this._menulist$.asObservable();

    constructor(private http: HttpClient) {}

    UserRegistartion(_data: UserRegistration): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.baseUrl}User/userregistration`, _data);
    }

    ConfirmRegistartion(_data: RegisterConfirm): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.baseUrl}User/confirmregistration`, _data);
    }

    Proceedlogin(_data: userCred): Observable<loginResp> {
        return this.http.post<loginResp>(`${this.baseUrl}Authorize/GenerateToken`, _data);
    }

    LoadMenuByRole(role: string): Observable<menu[]> {
        return this.http.get<menu[]>(`${this.baseUrl}UserRole/GetAllMenusbyrole?userrole=${role}`).pipe(
            tap(menuResponse => {
                console.log('menuResponse: ', menuResponse);
                //this._menulist$.next(menuResponse);
            })
        );
    }

    Resetpassword(_data: ResetPasswordFormModel): Observable<ApiResponse> {
        console.log('_data: ', _data);
        return this.http.post<ApiResponse>(`${this.baseUrl}User/resetpassword`, _data);
    }

    Forgetpassword(username: string): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.baseUrl}User/forgetpassword?userName=${username}`);
    }
}
