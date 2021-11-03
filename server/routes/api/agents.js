const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load agent model
const Agent = require("../../models/Agent");

// @route POST api/agents/register
// @desc Register agent
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Agent.findOne({ email: req.body.email }).then((agent) => {
    if (agent) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newAgent = new Agent({
        agentName: req.body.name,
        agentEmail: req.body.email,
        agentPassword: req.body.password,
      });
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAgent.agentPassword, salt, (err, hash) => {
          if (err) throw err;
          newAgent.agentPassword = hash;
          newAgent
            .save()
            .then((agent) => res.json(agent))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/agents/login
// @desc Login agent and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  Agent.findOne({ email }).then((agent) => {
    // Check if agent exists
    if (!agent) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, agent.agentPassword).then((isMatch) => {
      if (isMatch) {
        // agent matched
        // Create JWT Payload
        const payload = {
          id: agent.id,
          name: agent.agentName,
          email: agent.agentEmail,
        };
        // Sign token
        jwt.sign(
          payload,
          keys.SECRETORKEY,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// add client to agent
router.post("/client", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const agentEmail = req.body.agentEmail;
  Agent.findOne({ agentEmail }).then((agent) => {
    if (agent) {
      const newClient = {
        clientName: req.body.name,
        clientPassword: req.body.password,
        clientEmail: req.body.email,
        totalInvested: 0,
      };
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newClient.clientPassword, salt, (err, hash) => {
          if (err) throw err;
          newClient.clientPassword = hash;
          agent.clients.push(newClient);
          agent
            .save()
            .then((agent) => res.json(agent))
            .catch((err) => console.log(err));
        });
      });
      return res.status(201).json({
        success: true,
        message: "User has been added to database",
      });
    } else {
      return res.status(404).json({ agentnotfound: "Agent not found" });
    }
  });
});

//get clients of the agent

router.get("/client", (req, res) => {
  const agentEmail = req.query.agentEmail;
  Agent.findOne({ agentEmail }).then((agent) => {
    if (agent) {
      return res.status(200).json(agent.clients);
    } else {
      return res.status(404).json({ agentnotfound: "Agent not found" });
    }
  });
});

//add fund to client

router.post("/client/fund", (req, res) => {
  const { agentEmail, clientEmail, fundName, amt, code, date } = req.body;
  Agent.findOne({ agentEmail }).then((agent) => {
    if (agent) {
      agent.clients.forEach((client) => {
        if (client.clientEmail === clientEmail) {
          client.totalInvested += amt;
          client.funds.push({
            fundName: fundName,
            amtInvested: amt,
            code: code,
            dateOfInvestment: date,
          });
        }
      });
      agent.save().then(() => res.json({ success: true }));
    } else {
      return res.status(404).json({ error: "Agent not found" });
    }
  });
});

//get funds of the client

router.get("/client/fund", (req, res) => {
  const agentEmail = req.query.agentEmail;
  const clientEmail = req.query.clientEmail;
  Agent.findOne({ agentEmail }).then((agent) => {
    if (agent) {
      agent.clients.forEach((client) => {
        if (client.clientEmail === clientEmail) {
          return res.status(200).json(client.funds);
        }
      });
    } else {
      return res.status(404).json({ error: "Agent not found" });
    }
  });
});

module.exports = router;
