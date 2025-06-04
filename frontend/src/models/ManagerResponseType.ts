import {IManager} from "@/models/IManager";
import {OrderEnum} from "@/enums/oreder.enum";
import {ManagerListOrderEnum} from "@/enums/manager-list-order.enum";

export type ManagerResponseType = {
    total: number;
    data:IManager[];
    limit: number;
    page: number;
    order:OrderEnum;
    orderBy:ManagerListOrderEnum;
}