
export interface IPasswordCreate {
    password: string;
    confirmPassword: string;
}
export interface IForgotPassword {
    password: string;
}

export interface IForgotPasswordSet {
    password: string;
    token: string;
}