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
            userLoaded: (state, action) => {
                return {
                    ...state,
                    isAuthenticated: true,
                    loading: false,
                    user: action.payload,
                }
            },
            loginSuccess: (state, action) => {
                localStorage.setItem('token', action.payload.token);

                return {
                    ...state,
                    ...action.payload,
                    isAuthenticated: true,
                    loading: false,
                }
            },
            registerSuccess: (state, action) => {
                localStorage.setItem('token', action.payload.token);

                return {
                    ...state,
                    ...action.payload,
                    isAuthenticated: true,
                    loading: false,
                }
            },
            registerFail: (state) => {
                localStorage.removeItem('token');
                return {
                    ...state,
                    isAuthenticated: false,
                    loading: false,
                    token: null,
                }
            },
            authError: (state) => {
                localStorage.removeItem('token');
                return {
                    ...state,
                    isAuthenticated: false,
                    loading: false,
                    token: null,
                }
            },
            loginFail: (state) => {
                localStorage.removeItem('token');
                return {
                    ...state,
                    isAuthenticated: false,
                    loading: false,
                    token: null,
                }
            },
            logout: (state) => {
                localStorage.removeItem('token');
                return {
                    ...state,
                    isAuthenticated: false,
                    loading: false,
                    token: null,
                }
            }
        },
    }
)

export const {registerSuccess, registerFail, userLoaded, authError, loginSuccess, loginFail} = authSlice.actions;

export const authReducer = authSlice.reducer;

