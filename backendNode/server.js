const { getAccessToken } = require("./salesforce/getAccessToken.js");

const express = require("express");
const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:5173"
};

const app = express();

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000;

//init middleware
app.use(express.json({ extended: false }));

// Define routes
app.use("/api/authbrand", require("./routes/api/authBrand.js"));
app.use("/api/authinfluencer", require("./routes/api/authInfluencer.js"));
app.use("/api/influencers", require("./routes/api/influencers.js"));
app.use("/api/influencersocials", require("./routes/api/socials.js"));
// app.use("/api/profile/brand", require("./routes/api/profileBrand.js"));
// app.use("/api/auth/brand", require("./routes/api/authBrand.js"));
// app.use("/api/profile/brand", require("./routes/api/profileBrand.js"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
