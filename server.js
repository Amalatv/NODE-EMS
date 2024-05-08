const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require("body-parser");
const path = require('path');
const connectDB = require('./server/database/connection');
const cors = require("cors");
const session = require('express-session');
const app = express();

// Load environment variables from config.env file
dotenv.config({ path: 'config.env' });

// Set up session middleware
app.use(session({
    secret: process.env.secret_key,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}));

const PORT = process.env.PORT || 8080;

app.use(cors());

// Log requests
app.use(morgan('tiny'));

// MongoDB connection
connectDB();

app.use(express.json());

// Parse request bodies
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Set EJS as view engine
app.set("view engine", "ejs");

// Load static files
app.use(express.static(__dirname + "/public"));
app.use("/avatars", express.static(path.resolve(__dirname, "avatars")));

// Routes
app.use('/', require('./server/routes/employeeRouter'));
app.use('/register', require('./server/routes/userRouter'));
app.use("/",require('./server/routes/routes'))



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
