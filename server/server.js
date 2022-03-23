const express = require("express");
const mongoose = require("mongoose");
const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("swagger.yaml");
const morgan = require("morgan");

//environment variables
require("dotenv").config();
const { PORT } = process.env;

// importing middleware
const auth = require("./middleware/auth");

//importing routes
const agents = require("./routes/api/agents");
const allfunds = require("./routes/api/allfunds");
const fund = require("./routes/api/fund");

// regular middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// morgan middleware
app.use(morgan("tiny"));

// Connect to MongoDB
require("./config/database").connect();

// home route
app.get("/", (req, res) => res.send("Welcome to the Fund Management System"));

//swagger middleware
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use("/api/agents", agents);
app.use("/api/allfunds", auth, allfunds);
app.use("/api/fund", auth, fund);

const port = PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
