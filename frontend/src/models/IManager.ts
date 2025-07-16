export interface IManager {
    _id: string;
    id:number;
    name: string;
    surname: string;
    email: string;
    role: string;
    status: string;
    phone?: string;
    isDeleted: boolean;
    isVerified: boolean;
    isBanned: boolean;
    createdAt: Date;
    updatedAt: Date;
    lastVisit: Date | null;
}

export interface IManagerCreate {
    name: string;
    surname: string;
    email: string;
}

export interface IManagerLogin {
    email: string;
    password: string;
}
