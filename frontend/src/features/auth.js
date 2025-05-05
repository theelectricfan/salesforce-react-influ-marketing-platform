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
                    ...action.payload,
                    isAuthenticated: true,
                    loading: false,
                }
            },
            loginSuccess: (state, action) => {
                localStorage.setItem('token', action.payload.token);
                localStorage.setItem('tokenType', action.payload.tokenType);
                return {
                    ...state,
                    ...action.payload,
                    isAuthenticated: true,
                    loading: false,
                }
            },
            registerSuccess: (state, action) => {
                localStorage.setItem('token', action.payload.token);
                
                localStorage.setItem('tokenType', action.payload.tokenType);

                return {
                    ...state,
                    ...action.payload,
                    isAuthenticated: true,
                    loading: false,
                }
            },
            registerFail: (state) => {
                localStorage.removeItem('token');
                localStorage.removeItem('tokenType');
                return {
                    ...state,
                    isAuthenticated: false,
                    loading: false,
                    token: null,
                    user: null,
                }
            },
            authError: (state) => {
                localStorage.removeItem('token');
                
                localStorage.removeItem('tokenType');
                return {
                    ...state,
                    isAuthenticated: false,
                    loading: false,
                    token: null,
                    user: null,
                }
            },
            loginFail: (state) => {
                localStorage.removeItem('token');
                
                localStorage.removeItem('tokenType');
                return {
                    ...state,
                    isAuthenticated: false,
                    loading: false,
                    token: null,
                    user: null,
                }
            },
            logout: (state) => {
                localStorage.removeItem('token');
                
                localStorage.removeItem('tokenType');
                return {
                    ...state,
                    isAuthenticated: false,
                    loading: false,
                    token: null,
                    user: null,
                }
            }
        },
    }
)

export const {registerSuccess, registerFail, userLoaded, authError, loginSuccess, loginFail, logout} = authSlice.actions;

export const authReducer = authSlice.reducer;

