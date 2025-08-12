const express = require("express");
const app = express();
const cors = require('cors');
const connectDb = require("./connection/connection");
const authRoutes = require("./routes/auth");

const UI_PORT = process.env.UI_PORT || 3000;
const UI_HOST = process.env.UI_HOST || 'localhost';
const API_PORT = process.env.API_PORT || 8081;

const allowedOrigins = [
    'http://localhost:5173',
    `http://${UI_HOST}:${UI_PORT}`,
    `http://localhost:${UI_PORT}`,
    `http://127.0.0.1:${UI_PORT}`
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
app.use(express.json());

app.use('/auth', authRoutes);


if (require.main === module) {
    app.listen(API_PORT, () => {
        console.log(`Listening on ${API_PORT}`);
        connectDb().then(() => {
            console.log("MongoDb connected");
        });
    });
}

module.exports = app;