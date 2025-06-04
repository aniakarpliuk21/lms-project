import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IComment} from "@/models/IComment";
import {commentService} from "@/services/comment.service";

type CommentSliceType = {
    comments: IComment[];
    comment: IComment| null;
    error: string | null;
    loading: boolean;
};
type CreateCommentArgs = {
    commentBody: string;
    studentId: string;
}

const initialState: CommentSliceType = {
    comments:[],
    comment: null,
    error: null,
    loading: false,
};

const getAllCommentsByStudentId = createAsyncThunk(
    "commentSlice/getAllCommentsByStudentId",
    async (studentId:string, thunkAPI) => {
        try {
            const response = await commentService.getAllCommentsByStudentId(studentId);
            return thunkAPI.fulfillWithValue(response);
        } catch (e) {
            console.error("Error fetching comments", e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const createComment = createAsyncThunk(
    "commentSlice/createComment",
    async (args:CreateCommentArgs, thunkAPI) => {
        try {
            const {commentBody,studentId} =args
            const createComment = await commentService.createComment(commentBody,studentId);
            return thunkAPI.fulfillWithValue(createComment);
        } catch (e) {
            console.error("Error creating comment", e);
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const commentSlice = createSlice({
    name: "commentSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCommentsByStudentId.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCommentsByStudentId.fulfilled, (state, action: PayloadAction<IComment[]>) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(getAllCommentsByStudentId.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createComment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createComment.fulfilled, (state, action: PayloadAction<IComment>) => {
                state.loading = false;
                state.comment = action.payload;
            })
            .addCase(createComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const commentSliceActions = {
    ...commentSlice.actions,
    getAllCommentsByStudentId,
    createComment,
};