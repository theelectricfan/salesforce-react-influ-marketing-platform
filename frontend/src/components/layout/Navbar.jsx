import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
    const location = useLocation();

    const isOnInfluencerPage = location.pathname.startsWith("/influencer");

    return (
        <nav className="navbar bg-dark">
            <h1>
                {isOnInfluencerPage ? (
                    <Link to="/influencer">BuzzHive</Link>
                ) : (
                    <Link to="/">BuzzHive</Link>
                )}
            </h1>
            <ul>
                <li>
                    <Link to="/browseInfluencers">Influencers</Link>
                </li>
                <li>
                    {isOnInfluencerPage ? (
                        <Link to="/">Are you a Brand?</Link>
                    ) : (
                        <Link to="/influencer">Are you an Influencer?</Link>
                    )}
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
