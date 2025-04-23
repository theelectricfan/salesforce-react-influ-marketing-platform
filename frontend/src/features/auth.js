import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null,
}

export const authSlice = createSlice(
    {
        name: 'authStatus',
        initialState,
        reducers: {
            registerSuccess: (state, action) => {
                localStorage.setItem('token', action.payload.token);

                return {
                    ...state,
                    isAuthenticated: true,
                    loading: false,
                    token: action.payload.token,
                    user: action.payload.user,
                }
            },
            registerFail: (state) => {
                localStorage.removeItem('token');
                return {
                    ...state,
                    isAuthenticated: false,
                    loading: false,
                    token: null,
                    user: null,
                }
            },
        },
    }
)

export const {registerSuccess, registerFail} = authSlice.actions;

export const authReducer = authSlice.reducer;

