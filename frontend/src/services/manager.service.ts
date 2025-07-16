import {IManager, IManagerCreate} from "@/models/IManager";
import {urlBuilder} from "@/urls/urls";
import {ManagerResponseType} from "@/models/ManagerResponseType";
import {myInterceptors} from "@/services/helper.service";
import {OrderEnum} from "@/enums/oreder.enum";
import {ManagerListOrderEnum} from "@/enums/manager-list-order.enum";

const managerService = {
    createManager: async (registerData:IManagerCreate): Promise<IManager> => {
            const url = urlBuilder.registerManagerUrl();
            const options: RequestInit = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            };
            return (await myInterceptors(url, options).then(value => value.json()));


    },
    getMe : async(): Promise<IManager> => {
        const url = urlBuilder.getMeUrl();
        const options: RequestInit = {
            method: 'GET',
            headers: {
        'Content-Type': 'application/json',
            }
        };
        return (await myInterceptors(url, options).then(value => value.json()));
    },
    getAllManagers: async (page: number, search: string, limit: number, order: OrderEnum, orderBy: ManagerListOrderEnum): Promise<ManagerResponseType> => {
        let url = urlBuilder.getAllManagerUrl() + `?orderBy=${orderBy}&order=${order}&limit=${limit}&page=${page}`;

        if (search) {
            url += `&search=${encodeURIComponent(search)}`;
        }
            const options: RequestInit = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        return (await myInterceptors(url, options).then(value => value.json()));


    },
    getAllManagersFull:async (): Promise<IManager[]> => {
        const url = urlBuilder.getAllManagerFullUrl();

        const options: RequestInit = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }
        return (await myInterceptors(url, options).then(value => value.json()));


    },
    sendActivateEmail: async(email:string):Promise<boolean> => {
        const url = urlBuilder.sendActivateEmailUrl();
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email})
        }
        const response = await myInterceptors(url, options);
        if (response.status === 204) {
            return true;
        }
        return false;
    },
    banManager: async (managerId:string): Promise<boolean> => {
        const url = urlBuilder.banManagerUrl();
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({managerId})
        }
        const response = await myInterceptors(url, options);
        if (response.status === 204) {
            return true;
        }
        return false;
    },
    unbanManager: async (managerId:string): Promise<boolean> => {
        const url = urlBuilder.unbanManagerUrl();
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({managerId})
        }
        const response = await myInterceptors(url, options);
        if (response.status === 204) {
            return true;
        }
        return false;
    }
}
export {
    managerService
}