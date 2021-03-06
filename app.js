// Importing all required libraries.
const express = require("express");
const colors = require("colors");
var cors = require('cors');

// Instacing the app with express.
const app = express();

// Setting up some important server properties.
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(express.static("./Frontend/public"));

// Setting up the application database;
const database = require("./database/settings");

// Setting up the application routes path.
const indexRoutes = require("./controllers/api/v1/index");
const userRoutes = require("./controllers/api/v1/user");
const partnerRoutes = require("./controllers/api/v1/partner");
const organizationRoutes = require("./controllers/api/v1/organization");
const bankAccountRoutes = require("./controllers/api/v1/bankAccount");
const orderRoutes = require("./controllers/api/v1/order");
const addressRoutes = require("./controllers/api/v1/address");
const reservationRoutes = require("./controllers/api/v1/reservation");
const modalityRoutes = require("./controllers/api/v1/modality");
const roleRoutes = require("./controllers/api/v1/role"); 

// Setting up the application routes itself.
app.use("/api/v1/", indexRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/partner", partnerRoutes);
app.use("/api/v1/organization", organizationRoutes);
app.use("/api/v1/bank-account", bankAccountRoutes)
app.use("/api/v1/address", addressRoutes);
app.use("/api/v1/reservation", reservationRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/modality", modalityRoutes);
app.use("/api/v1/role", roleRoutes);

// Setting up the application port.
const port = process.env.PORT || 4005;

// Listening port...
app.listen(port, error => {

    // Cleaning up the console.
    console.clear();

    // Printing the server status on screen.
    error ?
    console.log(colors.red(`There was an error while starting server...\n ${error}`)) :
    console.log(colors.green.bold(`🚀 Server started successfully. Listening http://localhost:${port}.`));

})