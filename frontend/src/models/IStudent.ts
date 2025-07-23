
export interface IStudent {
    _id: string;
    id:number
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    age?: number;
    course?: string;
    course_format?: string;
    course_type?: string;
    status?: string;
    sum?: number;
    alreadyPaid?: number;
    _managerId?: string | null;
    group?: string;
    utm?: string;
    msg?: string | null;
    createdAt: Date;
    updatedAt: Date;
}
export interface IStudentUpdate {
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    age?: number;
    course?: string;
    course_format?: string;
    course_type?: string;
    status?: string;
    sum?: number;
    alreadyPaid?: number;
    _managerId?: string | null;
    group?: string;
}
export interface IStudentSearch {
    name?: string;
    surname?: string;
    email?: string;
    phone?: string;
    age?: number;
    course?: string;
    course_format?: string;
    course_type?: string;
    status?: string;
    group?: string;
    startDate?: Date;
    endDate?: Date;
    managerOnly?: boolean;
}

export interface IStudentStatistics {
    total: number;
    'In work': number;
    'New': number;
    'Aggre': number;
    'Disaggre': number;
    'Dubbing': number;
}

export type IStudentListQuery = {
    page: number;
    limit: number;
    course?: string;
    course_type?: string;
    course_format?: string;
    status?: string;
    age?: number;
    manager?: string;
    group?: string;
    order?: 'asc' | 'desc';
    orderBy?: string;
    managerOnly?: boolean;
    currentManagerId?: string;
};
