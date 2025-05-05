import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import InfiniteScroll from "react-infinite-scroll-component"; // Missing import added
import { SetAlertMethod } from "../../actions/alert";
import { useDispatch } from "react-redux";

export const InfluencerList = () => {
    const [influencers, setInfluencers] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);

    const limitVar = 50;

    const dispatch = useDispatch();

    const fetchInfluencers = async (
        pageNumber = page,
        search = searchTerm,
        reset = false
    ) => {
        setLoading(true);
        console.log("Fetching influencers...");
        console.log("Page Number:", pageNumber);
        console.log("Search Term:", search);

        try {
            const response = await axiosInstance.get("/api/influencers/list", {
                headers: {
                    "Content-Type": "application/json",
                },
                params: {
                    page: pageNumber,
                    limit: limitVar,
                    searchTerm: search,
                },
            });

            const newInfluencers = response.data.influencers;

            if (reset) {
                setInfluencers(newInfluencers);
            } else {
                setInfluencers((prev) => [...prev, ...newInfluencers]);
            }

            setPage(pageNumber + 1);
            setHasMore(newInfluencers.length === limitVar);
        } catch (error) {
            console.error(error);
            SetAlertMethod(
                "Error fetching influencers. Please try again.",
                "danger",
                dispatch
            );
        } finally {
            setLoading(false);
        }
    };

    const handleSearchSubmit = () => {
        // Reset and search with new term
        setHasMore(true);
        fetchInfluencers(1, searchTerm, true);
    };

    useEffect(() => {
        fetchInfluencers(1, "", true); // Initial load with empty search
    }, []);

    return (
        <>
            <h1 className="large text-primary">Influencers</h1>
            <p className="lead">
                <i className="fab fa-connectdevelop"></i> Find the right
                influencer for your brand
            </p>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search for influencers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()}
                />
                <button
                    onClick={handleSearchSubmit}
                    className="btn btn-primary"
                    disabled={loading}
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </div>

            <div className="profiles">
                <InfiniteScroll
                    dataLength={influencers.length}
                    next={() => fetchInfluencers(page, searchTerm, false)}
                    hasMore={hasMore}
                    loader={<h4>Loading more influencers...</h4>}
                    endMessage={
                        <p className="text-center">
                            No more influencers to display
                        </p>
                    }
                >
                    {influencers.length === 0 && !loading ? (
                        <p>
                            No influencers found. Try a different search term.
                        </p>
                    ) : (
                        influencers.map((influencer) => (
                            <div
                                key={influencer.Id}
                                className="profile bg-light"
                            >
                                <img
                                    className="round-img"
                                    src="https://pbs.twimg.com/profile_images/1297903845792796672/GhUKN8fq_400x400.jpg"
                                    alt={`${influencer.Name}'s profile`}
                                />
                                <div>
                                    <h2>{influencer.Name}</h2>
                                    <a
                                        href={`/profile/${influencer.Id}`}
                                        className="btn btn-primary"
                                    >
                                        View Profile
                                    </a>
                                </div>

                                <ul>
                                    {influencer.Platforms &&
                                        influencer.Platforms.map(
                                            (platform, index) => (
                                                <li
                                                    key={index}
                                                    className="text-primary"
                                                >
                                                    <i className="fas fa-check"></i>{" "}
                                                    {platform}
                                                </li>
                                            )
                                        )}
                                    {!influencer.Platforms && (
                                        <>
                                            <li className="text-primary">
                                                <i className="fas fa-check"></i>{" "}
                                                Youtube
                                            </li>
                                            <li className="text-primary">
                                                <i className="fas fa-check"></i>{" "}
                                                Instagram
                                            </li>
                                            <li className="text-primary">
                                                <i className="fas fa-check"></i>{" "}
                                                Twitter
                                            </li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        ))
                    )}
                </InfiniteScroll>
            </div>
        </>
    );
};
