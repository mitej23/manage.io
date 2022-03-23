require("dotenv").config("/server/.env");
const express = require("express");
const router = express.Router();

// controllers
const {
  registerAgent,
  loginAgent,
  addClient,
  getAllClients,
  getTimeline,
  getOneClient,
  getClientDetails,
  addFundToClient,
  getAllFundsOfClient,
} = require("../../controllers/agentsController");

// middleware
const auth = require("../../middleware/auth");

// register
router.post("/register", registerAgent);

// login
router.post("/login", loginAgent);

// add client to agent
router.post("/client", auth, addClient);

// get clients of the agent
router.get("/clients", auth, getAllClients);

// get investment history i.e timeline of investment
router.get("/timeline", auth, getTimeline);

//get client of the agent
router.get("/client", auth, getOneClient);

//get client Detail
router.get("/clientDetail", auth, getClientDetails);

// add fund to client
router.post("/client/fund", auth, addFundToClient);

//get funds of the client
router.get("/client/fund", auth, getAllFundsOfClient);

module.exports = router;
