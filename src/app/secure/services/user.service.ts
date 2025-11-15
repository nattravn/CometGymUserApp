import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from '@environments/environment.development';

import { ApiResponse } from '@app/core/models/api-response';
import {
    LoginResp,
    Menu,
    MenuPermission,
    Menus,
    RegisterConfirm,
    ResetPasswordFormModel,
    Roles,
    UpdatePassword,
    UpdateUser,
    UserCred,
    UserRegistration,
    Users,
} from '@app/core/models/user.model';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    baseUrl = environment.apiUrl;

    _registerresp = signal<RegisterConfirm>({
        userid: 0,
        username: '',
        otptext: '',
    });

    _username = signal('');

    _menulist = signal<Menu[]>([]);

    userRegisteration(_data: UserRegistration): Observable<any> {
        return this.http.post(`${this.baseUrl}User/userregisteration`, _data);
    }

    confirmRegisteration(_data: RegisterConfirm): Observable<any> {
        return this.http.post(`${this.baseUrl}User/confirmregisteration`, _data);
    }

    proceedLogin(_data: UserCred): Observable<any> {
        return this.http.post<LoginResp>(`${this.baseUrl}Authorize/GenerateToken`, _data);
    }

    loadMenuByRole(role: string): Observable<Menu[]> {
        return this.http.get<Menu[]>(`${this.baseUrl}UserRole/GetAllMenusbyrole?userrole=${role}`);
    }

    resetPassword(_data: ResetPasswordFormModel): Observable<any> {
        return this.http.post(`${this.baseUrl}User/resetpassword`, _data);
    }

    forgetPassword(username: string): Observable<any> {
        return this.http.get(`${this.baseUrl}User/forgetpassword?username=${username}`);
    }

    updatePassword(_data: UpdatePassword): Observable<any> {
        return this.http.post(`${this.baseUrl}User/updatepassword`, _data);
    }

    getMenuPermission(role: string, menuname: string): Observable<any> {
        return this.http.get<MenuPermission>(
            `${this.baseUrl}UserRole/GetMenupermissionbyrole?userrole=${role}&menucode=${menuname}`
        );
    }

    getAllUsers(): Observable<any> {
        return this.http.get<Users[]>(`${this.baseUrl}User/GetAll`);
    }

    getUserByCode(code: string): Observable<any> {
        return this.http.get<Users>(`${this.baseUrl}User/GetBycode?code=${code}`);
    }

    getAllRoles(): Observable<any> {
        return this.http.get<Roles[]>(`${this.baseUrl}UserRole/GetAllRoles`);
    }

    updateRole(_data: UpdateUser): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.baseUrl}User/updaterole`, _data);
    }
    updateStatus(_data: UpdateUser): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.baseUrl}User/updatestatus`, _data);
    }

    getAllMenus(): Observable<Menus[]> {
        return this.http.get<Menus[]>(`${this.baseUrl}UserRole/GetAllMenus`);
    }

    assigRolePermission(_data: MenuPermission[]): Observable<ApiResponse> {
        return this.http.post<ApiResponse>(`${this.baseUrl}UserRole/assignrolepermission`, _data);
    }
}
