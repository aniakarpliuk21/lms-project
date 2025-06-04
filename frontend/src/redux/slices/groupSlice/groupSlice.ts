import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IGroup} from "@/models/IGroup";
import {groupService} from "@/services/group.service";

type GroupSliceType = {
    groups: IGroup[];
    group: IGroup| null;
    error: string | null;
    loading: boolean;
};


const initialState: GroupSliceType = {
    groups:[],
    group: null,
    error: null,
    loading: false,
};

const getAllGroups = createAsyncThunk(
    "groupSlice/getAllGroups",
    async (_, thunkAPI) => {
        try {
            const response = await groupService.getAllGroup();
            return thunkAPI.fulfillWithValue(response);
        } catch (e) {
            console.error("Error fetching groups", e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const createGroup = createAsyncThunk(
    "groupSlice/createGroup",
    async (name:string, thunkAPI) => {
        try {
            const newGroup = await groupService.createGroup(name);
            return thunkAPI.fulfillWithValue(newGroup);
        } catch (e) {
            console.error("Error creating group", e);
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const groupSlice = createSlice({
    name: "groupSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllGroups.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllGroups.fulfilled, (state, action: PayloadAction<IGroup[]>) => {
                state.loading = false;
                state.groups = action.payload;
            })
            .addCase(getAllGroups.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createGroup.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createGroup.fulfilled, (state, action: PayloadAction<IGroup>) => {
                state.loading = false;
                state.group = action.payload;
                state.groups.push(action.payload);
            })
            .addCase(createGroup.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const groupSliceActions = {
    ...groupSlice.actions,
    getAllGroups,
    createGroup,
};