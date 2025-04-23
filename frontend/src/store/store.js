import {configureStore} from '@reduxjs/toolkit';
import { alertReducer} from '../features/alert';
import { authReducer } from '../features/auth';

export const store = configureStore({
    reducer: {
        alerts: alertReducer,
        authStatus: authReducer,
    },
})

