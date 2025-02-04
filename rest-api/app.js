const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const path = require("path");

// locafiles
const dbConfig = require("../rest-api/config/db.config");
const url = dbConfig.url;

// Controllers
const recipeRoutes = require('../rest-api/recipes/routes/recipes.routing');
const userControllers = require('../rest-api/users/routes/users.routing');

const app = express();

mongoose
    .connect(url, 
       { useUnifiedTopology: true, useNewUrlParser: true  }
    )
    .then(() => {
        console.log("Connected to database!");
    })
    .catch(() => {
        console.log("Connection failed!");
    });

app.use(bodyParser.json());
/** if need the below code then trun it on later */
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

// routes injected here
recipeRoutes.routesConfig(app);
userControllers.routesConfig(app);
module.exports = app;
