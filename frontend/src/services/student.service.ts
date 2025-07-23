
import {urlBuilder} from "@/urls/urls";
import {myInterceptors} from "@/services/helper.service";
import {StudentResponseType} from "@/models/StudentResponceType";
import {IStudent, IStudentListQuery, IStudentStatistics} from "@/models/IStudent";
import {StudentResponseWithoutPaginationType} from "@/models/StudentListResponseWithoutPaginationType";
function buildStudentUrlWithParams(
    baseUrl: string,
    sortField: string,
    sortOrder: string,
    filters?: Partial<IStudentListQuery>
): URL {
    const url = new URL(baseUrl);
    url.searchParams.append("orderBy", sortField);
    url.searchParams.append("order", sortOrder);

    if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
                if (key === "managerOnly" && (value === true || value === "true")) {
                    const managerId = localStorage.getItem("managerId")?.trim();
                    if (managerId) {
                        url.searchParams.append("managerOnly", "true");
                        url.searchParams.append("currentManagerId", managerId);
                    }
                } else if (key !== "managerOnly") {
                    url.searchParams.append(key, value.toString());
                }
            }
        });
    }

    return url;
}

const studentService = {
    getAllStudents: async ( page: number,
                            sortField: string,
                            sortOrder: string,
                            filters?: Partial<IStudentListQuery>
    ): Promise<StudentResponseType> => {
        const url = buildStudentUrlWithParams(
            urlBuilder.getAllStudentUrl(),
            sortField,
            sortOrder,
            filters
        );
        url.searchParams.append("limit", "25");
        url.searchParams.append("page", page.toString());
        const options: RequestInit = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        }
        return (await myInterceptors(url.toString(), options).then(value => value.json()));


    },
    getAllStudentsWithoutPagination: async (
        sortField: string,
        sortOrder: string,
        filters?: Partial<IStudentListQuery>
        ): Promise<StudentResponseWithoutPaginationType> => {
        const url = buildStudentUrlWithParams(
            urlBuilder.getAllStudentsWithoutPaginationUrl(),
            sortField,
            sortOrder,
            filters
        );
            const options: RequestInit = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            return (await myInterceptors(url.toString(), options).then(value => value.json()));


        },
    getStudentStatistics: async (managerId?: string): Promise<IStudentStatistics> => {
        const url = new URL(urlBuilder.getStudentStatisticsUrl());
        if (managerId) {
            url.searchParams.append("managerId", managerId);
        }

        const options: RequestInit = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        };

        return (await myInterceptors(url.toString(), options).then(res => res.json()));
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