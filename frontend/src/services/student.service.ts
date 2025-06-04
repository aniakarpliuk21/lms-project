
import {urlBuilder} from "@/urls/urls";
import {myInterceptors} from "@/services/helper.service";
import {StudentResponseType} from "@/models/StudentResponceType";
import {IStudent, IStudentListQuery, IStudentStatisticsResponse} from "@/models/IStudent";

const studentService = {
    getAllStudents: async (page: number,
                           sortField: string,
                           sortOrder: string,
                           filters?: Partial<IStudentListQuery>
    ): Promise<StudentResponseType> => {
        const url = new URL(urlBuilder.getAllStudentUrl());
        url.searchParams.append("limit", "25");
        url.searchParams.append("page", page.toString());
        url.searchParams.append("orderBy", sortField);
        url.searchParams.append("order", sortOrder);
        if (filters) {
            Object.entries(filters).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== '') {
                    if (key === 'managerOnly' && value === 'true') {
                        const managerId = localStorage.getItem("managerId");
                        if (managerId) {
                            url.searchParams.append("managerOnly", "true");
                            url.searchParams.append("currentManagerId", managerId);
                        }
                    } else {
                        url.searchParams.append(key, value.toString());
                    }
                }
            });
        }

        const options: RequestInit = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }
        return (await myInterceptors(url.toString(), options).then(value => value.json()));


    },
    getStudentStatistics: async ():Promise<IStudentStatisticsResponse> => {
        const url = urlBuilder.getStudentStatisticsUrl();
        const options: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }
        return (await myInterceptors(url, options).then(value => value.json()));
    },
    updateStudent: async (studentId:string,dto:Partial<IStudent>):Promise<IStudent> => {
const url = urlBuilder.updateStudentUrl() + `/${studentId}`;
const options: RequestInit = {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(dto)
}
return (await myInterceptors(url, options).then(value => value.json()));
    }
}
export {
    studentService
}