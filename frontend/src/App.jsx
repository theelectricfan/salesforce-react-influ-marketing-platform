import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    useLocation,
} from "react-router-dom";

import "./App.css";
import { useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { LandingBrand } from "./components/layout/LandingBrand";
import { LandingInfluencer } from "./components/layout/LandingInfluencer";
import { RegisterBrand } from "./components/auth/RegisterBrand";
import { LoginBrand } from "./components/auth/LoginBrand";
import { LoginInfluencer } from "./components/auth/LoginInfluencer";
import { RegisterInfluencer } from "./components/auth/RegisterInfluencer";

import { Alert } from "./components/layout/Alert";
import { setAuthToken } from "./utils/setAuthToken";
import { loadBrandMethod } from "./actions/authBrand";
import { useDispatch, useSelector } from "react-redux";
import { ClimbingBoxLoader } from "react-spinners";

if (localStorage.token) {
    setAuthToken(localStorage.token);
}

const Layout = () => {
    const location = useLocation();

    // Define routes that shouldn't be wrapped in <section>
    const noWrapperRoutes = ["/", "/influencer"];
    const shouldWrap = !noWrapperRoutes.includes(location.pathname);

    return (
        <>
            <Navbar />
            {shouldWrap ? (
                <section className="container">
                    <Alert />
                    <Outlet />
                </section>
            ) : (
                <Outlet />
            )}
        </>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <LandingBrand /> },
            { path: "registerBrand", element: <RegisterBrand /> },
            { path: "loginBrand", element: <LoginBrand /> },
            { path: "browseInfluencers", element: <LandingBrand /> },
            { path: "landingInfluencer", element: <LandingBrand /> },
            { path: "loginInfluencer", element: <LoginInfluencer /> },
            { path: "registerInfluencer", element: <RegisterInfluencer /> },
            { path: "influencer", element: <LandingInfluencer /> },
            { path: "brandDashboard", element: <></> },
            { path: "influencerDashboard", element: <></> },
        ],
    },
]);

function App() {
    const dispatch = useDispatch();
    const isLoading= useSelector(
        (state) => state.authStatus.loading
    );
    useEffect(() => {
        loadBrandMethod(dispatch);
    }, []);
    if (isLoading) {
        return (
            <>
                <ClimbingBoxLoader
                    color="#0030ff"
                    cssOverride={{
                        margin: "200px auto",
                    }}
                    loading
                    size={50}
                />
            </>
        );
    }
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
