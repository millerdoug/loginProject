import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: false,
    role: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const {role} = action.payload;
            state.isLoggedIn = true;
            state.role = role;
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;
        },
    },
});

export const {login, logout} = authSlice.actions;
export default authSlice.reducer;
