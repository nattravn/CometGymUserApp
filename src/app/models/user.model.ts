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

export interface userCred {
    username: string;
    password: string;
}

export interface loginResp {
    token: string;
    refreshToken: string;
    userRole: string;
}

export interface menu {
    code: string;
    name: string;
}

export interface ResetPasswordFormModel {
    userName: string;
    oldPassword: string;
    newPassword: string;
}

export interface updatepassword {
    username: string;
    password: string;
    otptext: string;
}
