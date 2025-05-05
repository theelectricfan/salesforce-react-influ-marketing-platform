import React, {useState} from "react";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

const platformOptions = [
    "Blog/Website",
    "Facebook",
    "Instagram",
    "LinkedIn",
    "Pinterest",
    "Snapchat",
    "TikTok",
    "Twitch",
    "Twitter",
    "YouTube",
    "Others",
];


export const CreateInfluencerSocial = () => {
    const [formData, setFormData] = useState({
        followerCount: 0,
        platform: "",
        profileURL: "",
    });

    const influencerUserId = useSelector(
        (state) => state.authStatus.user.id
    )

    const { followerCount, platform, profileURL } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmitForm = (e) => {
        e.preventDefault();
        // try{
        //     const result = axiosInstance.post("/api/influencersocials/",
        //         {
        //             influencerID: influencerUserId, 
        //             followerCount: followerCount, 
        //             platform: platform, 
        //             profileURL: profileURL
        //         },
        //         {
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //         }
        //     )


        // }catch(error){

        // }
    }

    return (
        <>
            <h1 className="large text-primary">Add A Social Media profile</h1>
            <p className="lead">
                Add any social media profiles you have with great following
            </p>
            <small>* = required field</small>
            <form className="form" onSubmit={onSubmitForm}>
                <div className="form-group">
                    <select
                        name="platform"
                        value={platform}
                        onChange={onChange}
                        required
                    >
                        <option value="">* Select Platform</option>
                        {platformOptions.map((option) => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        placeholder="* follower count"
                        name="followerCount"
                        value={followerCount}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="url"
                        placeholder="URL"
                        name="url"
                        value={profileURL}
                        onChange={onChange}
                        required
                    />
                </div>

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/influencerDashboard">
                    Go Back
                </Link>
            </form>
        </>
    );
};
