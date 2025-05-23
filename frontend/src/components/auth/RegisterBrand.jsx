import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { SetAlertMethod } from "../../actions/alert";
import { RegisterBrandMethod } from "../../actions/authBrand";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const industryOptions = [
    { value: "Automotive", label: "Automotive" },
    { value: "Beauty & Personal Care", label: "Beauty & Personal Care" },
    { value: "E-commerce & Retail", label: "E-commerce & Retail" },
    { value: "Education", label: "Education" },
    { value: "Entertainment & Media", label: "Entertainment & Media" },
    { value: "Fashion & Apparel", label: "Fashion & Apparel" },
    { value: "Finance & Insurance", label: "Finance & Insurance" },
    { value: "Food & Beverage", label: "Food & Beverage" },
    { value: "Gaming", label: "Gaming" },
    { value: "Health & Fitness", label: "Health & Fitness" },
    { value: "Home & Living", label: "Home & Living" },
    { value: "NGO / Social Causes", label: "NGO / Social Causes" },
    { value: "Parenting & Kids", label: "Parenting & Kids" },
    { value: "Technology & Gadgets", label: "Technology & Gadgets" },
    { value: "Travel & Tourism", label: "Travel & Tourism" },
    { value: "Others", label: "Others" },
  ];

export const RegisterBrand = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        password2: "",
        industry: "",
    });


    const { name, email, phone, password, password2 } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const multiSelectOnChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(
            (option) => option.value
        );
        const industryString = selectedValues.join(";");
        setFormData({
            ...formData,
            industry : industryString,
        });
    }
    
    const onSubmit = e => {
        e.preventDefault();
        if (password !== password2) {
            
            SetAlertMethod("Passwords do not match", "danger", dispatch);

        } else {
            console.log("Form submitted", formData);
            RegisterBrandMethod(formData, dispatch);
            console.log("brand registered", formData);
        }
    }      
    const isAuthenticated = useSelector(
        (state) => state.authStatus.isAuthenticated
    );

    if (isAuthenticated) {
        return <Navigate to="/brandDashboard" />;
    }

    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Create Your Account
            </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        required
                        value = {name}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <Select
                        isMulti
                        name="industry"
                        placeholder="Industry"
                        options={industryOptions}
                        value={industryOptions.filter((option) =>
                            formData.industry.includes(option.value)
                        )}
                        onChange={multiSelectOnChange}
                        closeMenuOnSelect={false}
                        styles={{
                            control: (base, state) => ({
                                display: "flex",
                                width: "100%",
                                fontSize: "1.2rem",
                                border: state.isFocused
                                    ? "2px solid black"
                                    : "1px solid #ccc",
                                fontFamily: "inherit", 
                                boxShadow: "none",
                                height: '42px',
                                borderRadius: "4px",
                            }),
                        }}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        required
                        value = {email}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        name="phone"
                        required
                        value = {phone}
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
                        value = {password}
                        onChange={onChange}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        required
                        value = {password2}
                        onChange={onChange}
                    />
                </div>

                <input
                    type="submit"
                    className="btn btn-primary"
                    value="Register"
                />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/loginBrand">Sign In</Link>
            </p>
        </>
    );
};
