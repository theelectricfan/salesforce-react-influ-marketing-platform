import {axiosInstance} from '../axiosInstance';
import { registerSuccess, registerFail } from '../features/auth';
import { SetAlertMethod } from './alert';


const RegisterBrandHelper = async (config, body, dispatch) => {
    try {
        const response = await axiosInstance.post('http://localhost:5000/api/authbrand/signup', body, config);

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

export const RegisterBrandMethod = ({name, industry, phone, email, password}, dispatch) =>{
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

    RegisterBrandHelper(config, body, dispatch);
}

