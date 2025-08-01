import {urlBuilder} from "@/urls/urls";
import {myInterceptors} from "@/services/helper.service";
import {IManager} from "@/models/IManager";
import {IForgotPasswordSet} from "@/models/IPassword";

const passwordService = {
    createPassword: async (password: string): Promise<boolean> => {
        const manager:IManager = JSON.parse(localStorage.getItem("manager") || "{}");
        const managerId = manager._id;
       const response = await fetch(urlBuilder.createPasswordUrl(), {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({managerId, password }),
       })
        return response.status === 204;
    },
    sendForgotPasswordEmail: async (email: string): Promise<boolean> => {
        const url = urlBuilder.forgotPasswordUrl();
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email})
        }
        const response = await myInterceptors(url, options);
        return response.status === 204;
    },
    forgotPasswordSet: async (dto:IForgotPasswordSet): Promise<boolean> => {
        const response = await myInterceptors(urlBuilder.forgotPasswordUrl(), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dto)
        });
        return response.status === 204;
    }
}
export { passwordService }