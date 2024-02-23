const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const Port = process.env.PORT || 8000;
const connection = require('./Config/db');
const audioRouter = require("./Routers/audioRecordingRoutes");

app.use(cors());
app.use(express.json());

// Routes
app.use("/audios", audioRouter);

// Welcome message
app.get("/", (req, res) => {
    res.status(200).send({ message: "Welcome to the backend of FSTAC App" });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Establish database connection and start server
connection.then(() => {
    app.listen(Port, () => {
        console.log("Server is connected to DB");
        console.log(`App is listening on port ${Port}`);
    });
}).catch(error => {
    console.error("Error connecting to DB:", error);
    process.exit(1); // Exit the process if database connection fails
});
