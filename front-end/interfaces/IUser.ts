export interface IUser {
    name: string;
    email: string;
    username: string;
    password?: string;
    passwordConfirm?: string;
    gender: string;
    birthDate: Date;
    address: string;
    city: string;
    country: string;
    photo: string;
}