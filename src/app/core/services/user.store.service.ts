import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import { Observable, ReplaySubject } from 'rxjs';

import { environment } from '@environments/environment.development';

import { ApiResponse } from '@app/core/models/api-response';
import {
    LoginResp,
    Menu,
    MenuPermission,
    RegisterConfirm,
    ResetPasswordFormModel,
    UpdatePassword,
    UserCred,
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

    _menulist = signal<Menu[]>([]);
    _username = signal<string>('');

    private _menulist$ = new ReplaySubject<Menu[]>(1);
    public menulist$ = this._menulist$.asObservable();

    constructor(private http: HttpClient) {}

    UserRegistartion(_data: UserRegistration): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.baseUrl}User/userregistration`, _data);
    }

    ConfirmRegistartion(_data: RegisterConfirm): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.baseUrl}User/confirmregistration`, _data);
    }

    Proceedlogin(_data: UserCred): Observable<any> {
        return this.http.post<LoginResp>(`${this.baseUrl}Authorize/GenerateToken`, _data);
    }

    LoadMenuByRole(role: string): Observable<Menu[]> {
        return this.http.get<Menu[]>(`${this.baseUrl}UserRole/GetAllMenusbyrole?userrole=${role}`);
    }

    Resetpassword(_data: ResetPasswordFormModel): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.baseUrl}User/resetpassword`, _data);
    }

    Forgetpassword(username: string): Observable<ApiResponse> {
        return this.http.get<ApiResponse>(`${this.baseUrl}User/forgetpassword?userName=${username}`);
    }

    Updatepassword(_data: UpdatePassword): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.baseUrl}'User/updatepassword`, _data);
    }

    Getmenupermission(role: string, menuname: string): Observable<MenuPermission> {
        return this.http.get<MenuPermission>(
            `${this.baseUrl}UserRole/GetMenupermissionbyrole?userrole=${role}&menucode=${menuname}`
        );
    }
}
