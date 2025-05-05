import {axiosInstance} from '../utils/axiosInstance';
import { registerSuccess, registerFail, userLoaded, authError, loginSuccess, loginFail, logout } from '../features/auth';
import { SetAlertMethod } from './alert';
import { setAuthToken } from '../utils/setAuthToken';


export const loadBrandMethod = async(dispatch)=>{

    console.log("loadBrandMethod called");
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try{
        const response = await axiosInstance.get('/api/authbrand/branduser');
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



export const RegisterBrandMethod = async ({name, industry, phone, email, password}, dispatch) =>{
    const brandName = name;
    const brandIndustry = industry;
    const brandPhone = phone;
    const brandEmail = email;
    const brandPassword = password;

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const body = JSON.stringify({brandName, brandIndustry, brandPhone, brandEmail, brandPassword});

    try {
        const response = await axiosInstance.post('/api/authbrand/signup', body, config);

        const payload = {
            ...response.data,
            tokenType: 'Brand'
        }

        dispatch(registerSuccess(payload));
        

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


export const LoginBrandMethod = async ({email, password}, dispatch) =>{

    const brandEmail = email;
    const brandPassword = password;

    const config = {
        headers: {
            'Content-Type': 'application/json',
        },
    }

    const body = JSON.stringify({brandEmail, brandPassword});

    try {
        const response = await axiosInstance.post('/api/authbrand/login', body, config);

        const payload = {
            ...response.data,
            tokenType: 'Brand'
        }

        dispatch(loginSuccess(payload));

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

export const LogoutBrandMethod = (dispatch) => {
    dispatch(logout());
}