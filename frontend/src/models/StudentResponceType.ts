import {IStudent} from "@/models/IStudent";


export type StudentResponseType = {
    total: number;
    data:IStudent[];
    limit: number;
    page: number;
    order:string;
    orderBy:string;
}