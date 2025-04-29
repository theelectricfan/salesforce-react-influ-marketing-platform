import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogoutBrandMethod } from "../../actions/authBrand";
import { LogoutInfluencerMethod } from "../../actions/authInfluencer";
import { Navigate } from "react-router-dom";

export const Navbar = () => {
    const dispatch = useDispatch();

    const location = useLocation();

    const isOnInfluencerPage = /influencer/i.test(location.pathname);

    const loading = useSelector((state) => state.authStatus.loading);

    const isAuthenticated = useSelector(
        (state) => state.authStatus.isAuthenticated
    );

    const notAuthenticatedRoutes = (
        <li>
            {isOnInfluencerPage ? (
                <Link to="/">Are you a Brand?</Link>
            ) : (
                <Link to="/influencer">Are you an Influencer?</Link>
            )}
        </li>
    );

    const authenticatedRoutes = (
        <li>
            {isOnInfluencerPage ? (
                <a
                    onClick={() => {
                        LogoutInfluencerMethod(dispatch);
                        <Navigate to="/influencer" replace />;
                    }}
                >
                    Logout
                </a>
            ) : (
                <a
                    onClick={() => {
                        LogoutBrandMethod(dispatch);
                        <Navigate to="/" replace />;
                    }}
                >
                    Logout
                </a>
            )}
        </li>
    );

    return (
        <nav className="navbar bg-dark">
            {!loading && isAuthenticated ? (
                <h1>
                    {isOnInfluencerPage ? (
                        <Link to="/influencerDashboard">Dashboard</Link>
                    ) : (
                        <Link to="/brandDashboard">Dashboard</Link>
                    )}
                </h1>
            ) : (
                <h1>
                    {isOnInfluencerPage ? (
                        <Link to="/influencer">BuzzHive</Link>
                    ) : (
                        <Link to="/">BuzzHive</Link>
                    )}
                </h1>
            )}
            <ul>
                <li>
                    <Link to="/browseInfluencers">Influencers</Link>
                </li>
                {!loading && isAuthenticated
                    ? authenticatedRoutes
                    : notAuthenticatedRoutes}
            </ul>
        </nav>
    );
};

export default Navbar;
