import {Link } from "react-router-dom";

export const LandingBrand = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">BuzzHive for Brands</h1>
                    <p className="lead">
                    Discover top influencers, manage your campaigns, and grow your brand’s reach.
                    Join the hive of smart marketers who are making waves.
                    </p>
                    <div className="buttons">
                        <Link to="/registerBrand" className="btn btn-primary">
                            Sign Up
                        </Link>
                        <Link to="/loginBrand" className="btn btn-light">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingBrand;
