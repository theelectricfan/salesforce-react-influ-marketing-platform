import React, { useState } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { SetAlertMethod } from "../../actions/alert";
import { RegisterInfluencerMethod } from "../../actions/authInfluencer";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const categoryOptions = [
    { value: "Art & Design", label: "Art & Design" },
    { value: "Automobiles", label: "Automobiles" },
    { value: "Beauty & Skincare", label: "Beauty & Skincare" },
    { value: "Comedy & Entertainment", label: "Comedy & Entertainment" },
    { value: "DIY & Crafts", label: "DIY & Crafts" },
    { value: "Education", label: "Education" },
    { value: "Fashion", label: "Fashion" },
    { value: "Finance & Investing", label: "Finance & Investing" },
    { value: "Fitness", label: "Fitness" },
    { value: "Food & Cooking", label: "Food & Cooking" },
    { value: "Gaming", label: "Gaming" },
    { value: "Lifestyle", label: "Lifestyle" },
    { value: "Motivation & Self-help", label: "Motivation & Self-help" },
    { value: "Others", label: "Others" },
    { value: "Parenting", label: "Parenting" },
    { value: "Pets", label: "Pets" },
    { value: "Photography", label: "Photography" },
    { value: "Product Reviews", label: "Product Reviews" },
    { value: "Technology", label: "Technology" },
    { value: "Travel", label: "Travel" },
];

export const RegisterInfluencer = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        password2: "",
        category: "",
    });

    const { name, email, phone, password, password2 } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const multiSelectOnChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map((option) => option.value);
        const categoryString = selectedValues.join(";");
        setFormData({
            ...formData,
            category: categoryString,
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            SetAlertMethod("Passwords do not match", "danger", dispatch);
        } else {
            console.log("Form submitted", formData);
            RegisterInfluencerMethod(formData, dispatch);
        }
    };
    const isAuthenticated = useSelector(
        (state) => state.authStatus.isAuthenticated
    );

    if (isAuthenticated) {
        return <Navigate to="/influencerDashboard" />;
    }

    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Create Your Influencer Account
            </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        required
                        value={name}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <Select
                        isMulti
                        name="category"
                        placeholder="Category"
                        options={categoryOptions}
                        value={categoryOptions.filter((option) =>
                            formData.category.includes(option.value)
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
                                height: "42px",
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
                        value={email}
                        onChange={onChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="tel"
                        placeholder="Phone Number"
                        name="phone"
                        required
                        value={phone}
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
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                        required
                        value={password2}
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
                Already have an influencer account?{" "}
                <Link to="/loginInfluencer">Sign In</Link>
            </p>
        </>
    );
};
