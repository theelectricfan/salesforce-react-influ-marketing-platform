import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const alertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setAlert: {
            reducer: (state, action) => {
                const alert = {
                    id: action.payload.id,
                    message: action.payload.message,
                    alertType: action.payload.alertType,
                };
                state.push(alert);
            },
        },
        removeAlert: (state, action) => {
            return state.filter(
                (alert) => alert.id != action.payload
            );
        },
    },
});

export const { setAlert, removeAlert } = alertSlice.actions;

export const alertReducer = alertSlice.reducer;
