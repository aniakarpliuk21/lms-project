
import {OrderEnum} from "@/enums/oreder.enum";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ManagerResponseType} from "@/models/ManagerResponseType";
import {IManager, IManagerCreate} from "@/models/IManager";
import {ManagerListOrderEnum} from "@/enums/manager-list-order.enum";
import {managerService} from "@/services/manager.service";

type ManagerSliceType = {
    managers: ManagerResponseType;
    managersFull:IManager[];
    manager: IManager| null;
    error: string | null;
    loading: boolean;
};

type GetAllManagerArgs = {
    page: number;
    search: string;
    limit: number;
    order: OrderEnum;
    orderBy: ManagerListOrderEnum;
};

const initialState: ManagerSliceType = {
    managers: {
        total: 0,
        data: [],
        limit: 6,
        page: 1,
        order: OrderEnum.DESC,
        orderBy: ManagerListOrderEnum.CREATED_AT,
    },
    manager: null,
    managersFull: [],
    error: null,
    loading: false,
};

const getAllManagers = createAsyncThunk(
    "managerSlice/getAllManagers",
    async (args: GetAllManagerArgs, thunkAPI) => {
        try {
            const { page, search, limit, order, orderBy } = args;
            const response = await managerService.getAllManagers(page, search, limit, order, orderBy);
            return thunkAPI.fulfillWithValue(response);
        } catch (e) {
            console.error("Error fetching managers", e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);
const getAllManagersFull = createAsyncThunk(
    "managerSlice/getAllManagersFull",
    async (_, thunkAPI) => {
        try {
            const response = await managerService.getAllManagersFull();
            return thunkAPI.fulfillWithValue(response);
        } catch (e) {
            console.error("Error fetching managers", e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const getMe = createAsyncThunk(
    "managerSlice/getMe",
    async (_, thunkAPI) => {
        try {
            const response = await managerService.getMe();
            return thunkAPI.fulfillWithValue(response);
        } catch (e) {
            console.error("Error manager", e);
            return thunkAPI.rejectWithValue(e);
        }
    }
);

const createManager = createAsyncThunk(
    "managerSlice/createManager",
    async (registerData: IManagerCreate, thunkAPI) => {
        try {
            const createManager = await managerService.createManager(registerData);
            return thunkAPI.fulfillWithValue(createManager);
        } catch (e) {
            console.error("Error creating managers", e);
            return thunkAPI.rejectWithValue(e);
        }
    }
)
export const managerSlice = createSlice({
    name: "managerSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllManagers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
            .addCase(getAllManagers.fulfilled, (state, action: PayloadAction<ManagerResponseType>) => {
                state.loading = false;
                state.managers = action.payload;
            })
            .addCase(getAllManagers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getAllManagersFull.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllManagersFull.fulfilled, (state, action: PayloadAction<IManager[]>) => {
                state.loading = false;
                state.managersFull = action.payload;
            })
            .addCase(getAllManagersFull.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getMe.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getMe.fulfilled, (state, action: PayloadAction<IManager>) => {
                state.loading = false;
                state.manager = action.payload;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createManager.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createManager.fulfilled, (state, action: PayloadAction<IManager>) => {
                state.loading = false;
                state.manager = action.payload;
            })
            .addCase(createManager.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const managerSliceActions = {
    ...managerSlice.actions,
    getAllManagers,
    getAllManagersFull,
    createManager,
    getMe,
};
