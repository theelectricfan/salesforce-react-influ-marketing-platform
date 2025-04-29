import {axiosInstance} from '../utils/axiosInstance';
import { registerSuccess, registerFail, userLoaded, authError, loginSuccess, loginFail, logout } from '../features/auth';
import { SetAlertMethod } from './alert';
import { setAuthToken } from '../utils/setAuthToken';


export const loadInfluencerMethod = async(dispatch)=>{

    console.log("loadInfluencerMethod called");
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try{
        const response = await axiosInstance.get('/api/authinfluencer/user');
        console.log(response.data);
        dispatch(userLoaded(response.data));
    } catch (error) {
        const errors = error.response.data.errors;
        if (errors) {
            errors.forEach((error) => {
                SetAlertMethod(error.msg, 'danger', dispatch);
            });
        }
        dispatch(authError());
    }
}



export const RegisterInfluencerMethod = async ({name, category, phone, email, password}, dispatch) =>{
    const influencerName = name;
    const influencerCategory = category;
    const influencerPhone = phone;
    const influencerEmail = email;
    const influencerPassword = password;

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const body = JSON.stringify({influencerName, influencerCategory, influencerPhone, influencerEmail, influencerPassword});

    try {
        const response = await axiosInstance.post('/api/authinfluencer/signup', body, config);

        dispatch(registerSuccess(response.data));

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach((error) => {
                SetAlertMethod(error.msg, 'danger', dispatch);
            });
        }
        dispatch(registerFail());

    }
}


export const LoginInfluencerMethod = async ({email, password}, dispatch) =>{

    const influencerEmail = email;
    const influencerPassword = password;

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const body = JSON.stringify({influencerEmail, influencerPassword});

    try {
        const response = await axiosInstance.post('/api/authinfluencer/login', body, config);

        dispatch(loginSuccess(response.data));

    } catch (error) {
        const errors = error.response.data.errors;

        if (errors) {
            errors.forEach((error) => {
                SetAlertMethod(error.msg, 'danger', dispatch);
            });
        }
        dispatch(loginFail());

    }
}

export const LogoutInfluencerMethod = (dispatch) => {
    dispatch(logout());
}