export interface UserRegistration {
    username: string;
    name: string;
    email: string;
    phone: string;
    password: string;
}

export interface RegisterConfirm {
    userid: number;
    username: string;
    otptext: string;
}

export interface UserCred {
    username: string;
    password: string;
}

export interface LoginResp {
    token: string;
    refreshToken: string;
    userRole: string;
}

export interface Menu {
    code: string;
    name: string;
}

export interface ResetPasswordFormModel {
    userName: string;
    oldPassword: string;
    newPassword: string;
}

export interface UpdatePassword {
    username: string;
    password: string;
    otpText: string;
}

export interface MenuPermission {
    menucode: string;
    userrole: string;
    haveview: boolean;
    haveadd: boolean;
    haveedit: boolean;
    havedelete: boolean;
}

export interface RoleMenu {
    menuCode: string;
    userRole: string;
    haveview: boolean;
    haveadd: boolean;
    haveedit: boolean;
    havedelete: boolean;
}

export interface Users {
    username: string;
    name: string;
    email: string;
    phone: string;
    isactive: boolean;
    statusname: string;
    role: string;
}

export interface Roles {
    code: string;
    name: string;
    status: boolean;
}
export interface UpdateUser {
    userName: string;
    userRole: string;
    status: boolean;
}

export interface Menus {
    code: string;
    name: string;
    status: boolean;
}
