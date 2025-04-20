import {Link } from "react-router-dom";

export const LandingInfluencer = () => {
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">BuzzHive for Influencers</h1>
                    <p className="lead">
                    Connect with leading brands, grow your audience, and get rewarded for your influence.
                    It's time to turn your content into collaborations.
                    </p>
                    <div className="buttons">
                        <Link to="/registerInfluencer" className="btn btn-primary">
                            Sign Up
                        </Link>
                        <Link to="/loginInfluencer" className="btn btn-light">
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LandingInfluencer;
