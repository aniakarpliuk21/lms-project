import {configureStore} from "@reduxjs/toolkit";
import {studentSlice} from "@/redux/slices/studentSlice/studentSlice";
import {managerSlice} from "@/redux/slices/managerSlice/managerSlice";
import {groupSlice} from "@/redux/slices/groupSlice/groupSlice";
import {commentSlice} from "@/redux/slices/commentSlice/commentSlice";

export const store = configureStore({
    reducer: {
        studentStore:studentSlice.reducer,
        managerStore:managerSlice.reducer,
        groupStore:groupSlice.reducer,
        commentStore:commentSlice.reducer,
    }
})