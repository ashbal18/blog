import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    objectId: string | null;
    name: string;
    email: string;
}

const userSlice = createSlice({
    name: "user",
    initialState: { objectId: null, name: "", email: "" } as UserState,
    reducers: {
        login: (state, action: PayloadAction<UserState>) => {
            state.objectId = action.payload.objectId;
            state.name = action.payload.name;
            state.email = action.payload.email;
        },
        logout: (state) => {
            state.objectId = null;
            state.name = "";
            state.email = "";
        },
    }
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer