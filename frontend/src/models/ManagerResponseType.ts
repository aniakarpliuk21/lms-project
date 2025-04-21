import {IManager} from "@/models/IManager";

export type ManagerResponseType = {
    total: number;
    data:IManager[];
    limit: number;
    page: number;
    order:string;
    orderBy:string;
}