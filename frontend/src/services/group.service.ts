
import {urlBuilder} from "@/urls/urls";
import {myInterceptors} from "@/services/helper.service";
import {IGroup} from "@/models/IGroup";

const groupService = {
    createGroup: async (name:string):Promise<IGroup> => {
        const url = urlBuilder.createGroupUrl();
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name})
        }
        return (await myInterceptors(url, options).then(value => value.json()));

    },
    getAllGroup: async ():Promise<IGroup[]> => {
        const url = urlBuilder.getAllGroupUrl();
        const options: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return (await myInterceptors(url, options).then(value => value.json()));
    },
    updateGroup: async (groupId:string,studentId:string):Promise<IGroup> => {
        const url = urlBuilder.updateGroupUrl() + `/${groupId}`;
        const options: RequestInit = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({studentId})
        }
        return (await myInterceptors(url, options).then(value => value.json()));
    }

}
export {
    groupService
}