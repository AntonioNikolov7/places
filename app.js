const express = require("express");
const bodyParser = require("body-parser");
const HttpError = require('./models/http-error')


const placesRoutes = require("./routes/places-routes");

const app = express();

app.use(bodyParser.json());

app.use("/api/places", placesRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Invalid Route', 404);
    throw error;
});
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.code || 500).json({
        message: error.message || "An unknown error occurred!",
    });
});

app.listen(3000, () => {
    console.log(`🚀 Server running at http://localhost:3000}`);
});