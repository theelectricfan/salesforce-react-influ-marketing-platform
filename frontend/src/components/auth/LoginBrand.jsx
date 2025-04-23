import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

export const LoginBrand = () => {
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
    };

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
