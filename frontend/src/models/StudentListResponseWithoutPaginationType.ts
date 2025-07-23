import {IStudent} from "@/models/IStudent";

export type StudentResponseWithoutPaginationType = {
    data:IStudent[];
    order:string;
    orderBy:string;
}