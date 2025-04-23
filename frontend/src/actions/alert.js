import {nanoid} from "nanoid";
import { setAlert, removeAlert } from "../features/alert";

export const SetAlertMethod = (message, alertType, dispatch, timeout = 5000) => {

    const alert = {
        id: nanoid(),
        message: message,
        alertType: alertType
    };

    dispatch(setAlert(alert));

    setTimeout(() => {
        dispatch(removeAlert(alert.id));
    }, timeout);
};
