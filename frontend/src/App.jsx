import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    useLocation,
    Navigate,
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
import { InfluencerList } from "./components/influencers/InfluencerList";
import { BrandDashboard } from "./components/brandDashboard/BrandDashboard";
import { InfluencerDashboard } from "./components/influencerDashboard/InfluencerDashboard";
import { loadInfluencerMethod } from "./actions/authInfluencer";
import { authError } from "./features/auth";
import { CreateInfluencerSocial } from "./components/influencerDashboard/createInfluencerSocial";
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

export const AuthWrapper = () => {
    const isAuthenticated = useSelector(
        (state) => state.authStatus.isAuthenticated
    );
    const userType = useSelector((state) => state.authStatus.user?.type);

    if (isAuthenticated) {
        if (userType === "Brand") {
            return <Navigate to="/brandDashboard" replace />;
        } else if (userType === "Influencer") {
            return <Navigate to="/influencerDashboard" replace />;
        }
    }

    return <Outlet />;
};

export const BrandWrapper = () => {
    const isAuthenticated = useSelector(
        (state) => state.authStatus.isAuthenticated
    );
    const userType = useSelector((state) => state.authStatus.user?.type);

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    } else {
        if (userType !== "Brand") {
            return <Navigate to="/" replace />;
        }
    }
    return <Outlet />;
};

export const InfluencerWrapper = () => {
    const isAuthenticated = useSelector(
        (state) => state.authStatus.isAuthenticated
    );
    const userType = useSelector((state) => state.authStatus.user?.type);
    if (!isAuthenticated) {
        return <Navigate to="/influencer" replace />;
    } else {
        if (userType !== "Influencer") {
            return <Navigate to="/" replace />;
        }
    }
    return <Outlet />;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                element: <AuthWrapper />, // 👈 Wraps protected/redirectable pages
                children: [
                    { index: true, element: <LandingBrand /> },

                    { path: "influencer", element: <LandingInfluencer /> },
                    { path: "registerBrand", element: <RegisterBrand /> },
                    { path: "loginBrand", element: <LoginBrand /> },
                    { path: "loginInfluencer", element: <LoginInfluencer /> },
                    {
                        path: "registerInfluencer",
                        element: <RegisterInfluencer />,
                    },
                ],
            },
            {
                element: <BrandWrapper />, // 👈 Wraps protected/redirectable pages
                children: [
                    { path: "brandDashboard", element: <BrandDashboard /> },
                ],
            },
            {
                element: <InfluencerWrapper />, // 👈 Wraps protected/redirectable pages
                children: [
                    {
                        path: "influencerDashboard",
                        element: <InfluencerDashboard />
                        
                    },
                    {
                        path: "addInfluencerSocial",
                        element: <CreateInfluencerSocial />
                    }
                ],
            },
            { path: "browseInfluencers", element: <InfluencerList /> },
        ],
    },
]);

function App() {
    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.authStatus.loading);

    useEffect(() => {
        console.log('inside useEffect');
        console.log('localStorage.tokenType' + localStorage.tokenType);
        if (localStorage.tokenType === 'Brand') {
            loadBrandMethod(dispatch);
        } else if (localStorage.tokenType === 'Influencer') {
            loadInfluencerMethod(dispatch);
        } else{
            dispatch(authError());
        }
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
