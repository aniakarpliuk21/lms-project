import {IStudent, IStudentStatistics} from "@/models/IStudent";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { studentService } from "@/services/student.service";
import { StudentResponseType } from "@/models/StudentResponceType";
import { OrderEnum } from "@/enums/oreder.enum";
import { StudentListOrderEnum } from "@/enums/student-list-order.enum";

type StudentSliceType = {
    students: StudentResponseType;
    student: IStudent | null;
    studentStatistics: IStudentStatistics | null;
    error: string | null;
    loading: boolean;
};

type GetAllStudentsArgs = {
    page: number;
    sortField: string;
    sortOrder: string;
};
type UpdateStudentArgs = {
    studentId: string;
    dto:Partial<IStudent>
}

const initialState: StudentSliceType = {
    students: {
        total: 0,
        data: [],
        limit: 25,
        page: 1,
        order: OrderEnum.DESC,
        orderBy: StudentListOrderEnum.CREATED_AT,
    },
    student: null,
    studentStatistics: null,
    error: null,
    loading: false,
};

const getAllStudents = createAsyncThunk(
    "studentSlice/getAllStudents",
    async (args: GetAllStudentsArgs, thunkAPI) => {
        try {
            const { page, sortField, sortOrder } = args;
            const response = await studentService.getAllStudents(page, sortField, sortOrder);
            return thunkAPI.fulfillWithValue(response);
        } catch (e) {
            console.error("Error fetching students", e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

export const getStudentStatistics = createAsyncThunk(
    "studentSlice/getStudentStatistics",
    async (_, thunkAPI) => {
        try {
            const response = await studentService.getStudentStatistics();
            return thunkAPI.fulfillWithValue(response.stats);
        } catch (e) {
            console.error("Error fetching statistics", e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);
export const updateStudent = createAsyncThunk(
    "studentSlice/updateStudent",
    async (args:UpdateStudentArgs, thunkAPI) => {
        try{
            const { studentId,dto } = args;
            const response = await studentService.updateStudent(studentId, dto);
            return thunkAPI.fulfillWithValue(response);
        }catch (e) {
            console.error("Error updating student", e);
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const studentSlice = createSlice({
    name: "studentSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllStudents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllStudents.fulfilled, (state, action: PayloadAction<StudentResponseType>) => {
                state.loading = false;
                state.students = action.payload;
            })
            .addCase(getAllStudents.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            })
            .addCase(updateStudent.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateStudent.fulfilled, (state, action: PayloadAction<IStudent>) => {
                state.loading = false;
                state.student = action.payload;
                const index = state.students.data.findIndex((student) => student._id === action.payload._id);
                if (index !== -1) {
                    state.students.data[index] = action.payload;
                }
            })
            .addCase(updateStudent.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getStudentStatistics.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getStudentStatistics.fulfilled, (state, action: PayloadAction<IStudentStatistics>) => {
                state.loading = false;
                state.studentStatistics = action.payload;
            })
            .addCase(getStudentStatistics.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const studentSliceActions = {
    ...studentSlice.actions,
    getAllStudents,
    getStudentStatistics,
    updateStudent
};
