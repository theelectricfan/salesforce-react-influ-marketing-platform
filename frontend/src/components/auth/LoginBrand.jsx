import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoginBrandMethod } from "../../actions/authBrand";
import { Navigate } from "react-router-dom";

export const LoginBrand = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = (e) => {
        e.preventDefault();

        console.log("Form submitted", formData);

        LoginBrandMethod(formData, dispatch);

    };
    const isAuthenticated = useSelector(
        (state) => state.authStatus.isAuthenticated
    );
   
    if (isAuthenticated) {
        return <Navigate to="/brandDashboard" />;
    }
    return (
        <>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Sign In Your Account
            </p>
            <form className="form" onSubmit={onSubmit}>

                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        required
                        value={email}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                        required
                        value={password}
                        onChange={onChange}
                    />
                </div>

                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Login"
                />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/registerBrand">Sign Up</Link>
            </p>
        </>
    );
};
