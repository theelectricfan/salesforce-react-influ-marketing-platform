import { createBrowserRouter, RouterProvider, Outlet, useLocation } from "react-router-dom";

import "./App.css";
import { Navbar } from "./components/layout/Navbar";
import { LandingBrand } from "./components/layout/LandingBrand";
import { LandingInfluencer } from "./components/layout/LandingInfluencer";
import { RegisterBrand } from "./components/auth/RegisterBrand";
import { LoginBrand } from "./components/auth/LoginBrand";
import { LoginInfluencer } from "./components/auth/LoginInfluencer";
import {RegisterInfluencer} from "./components/auth/RegisterInfluencer";


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
        ],
    },
]);

function App() {
    return (
        <>
            <RouterProvider router={router} />
        </>
    );
}

export default App;
