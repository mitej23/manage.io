const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const { sub } = require("date-fns");
const axios = require("axios");
const moment = require("moment");

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

router.get("/clients", (req, res) => {
  const agentEmail = req.query.agentEmail;
  Agent.findOne({ agentEmail }).then((agent) => {
    if (agent) {
      return res.status(200).json(agent.clients);
    } else {
      return res.status(404).json({ agentnotfound: "Agent not found" });
    }
  });
});

//utils of this router (later to be kept in a separate file)

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const gapInMonthsFromToday = (min) => {
  const todayMonth = new Date().getMonth();

  let months = (new Date().getFullYear() - new Date(min).getFullYear()) * 12;
  months -= new Date(min).getMonth();
  months += todayMonth;

  return months;
};

router.get("/timeline", (req, res) => {
  const agentEmail = req.query.agentEmail;
  Agent.findOne({ agentEmail }).then((agent) => {
    if (agent) {
      // get all funds of the client in month and year
      const funds = [];
      agent.clients.forEach((client) => {
        client.funds.forEach((fund) => {
          const tempFund = {
            clientName: client.clientName,
            fundName: fund.fundName,
            amtInvested: fund.amtInvested,
            dateOfInvestment: fund.dateOfInvestment,
          };
          funds.push(tempFund);
        });
      });
      //fund with minimum date
      const minDate = funds.reduce((a, b) =>
        new Date(a.dateOfInvestment) < new Date(b.dateOfInvestment) ? a : b
      );

      //find gap of months between minDate and today
      const gap = gapInMonthsFromToday(minDate.dateOfInvestment) + 1;

      //create array of months
      const monthsArray = [];
      for (let i = 0; i < gap; i++) {
        const subDate = sub(new Date(), { months: i });
        monthsArray.push({
          date: `${monthNames[subDate.getMonth()]}'${
            subDate.getFullYear() % 100
          }`,
          totalInvested: 0,
          investments: [],
        });
      }

      //add total invested to each month
      funds.forEach((fund) => {
        const date = fund.dateOfInvestment;
        const tempGap = gapInMonthsFromToday(date);
        monthsArray[tempGap].totalInvested += fund.amtInvested;
        monthsArray[tempGap].investments.push(fund);
      });

      return res.status(200).json({ monthsArray });
    } else {
      return res.status(404).json({ agentnotfound: "Agent not found" });
    }
  });
});

//get client of the agent
router.get("/client", (req, res) => {
  const agentEmail = req.query.agentEmail;
  const clientEmail = req.query.clientEmail;
  Agent.findOne({ agentEmail }).then((agent) => {
    if (agent) {
      const client = agent.clients.find(
        (client) => client.clientEmail === clientEmail
      );
      if (client) {
        return res.status(200).json(client);
      } else {
        return res.status(404).json({ clientnotfound: "Client not found" });
      }
    } else {
      return res.status(404).json({ agentnotfound: "Agent not found" });
    }
  });
});

// To be added in seperate utils files

async function fetchSingleData(fund) {
  const response = await axios.get(`https://api.mfapi.in/mf/${fund.code}`);
  const data = response.data.data;
  const curData = data[0];
  const date = new Date(fund.dateOfInvestment);

  //format date into mm-dd-yyyy
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // add 0 before single digit date
  const formattedDate = `${day < 10 ? `0${day}` : day}-${
    month < 10 ? `0${month}` : month
  }-${year}`;

  let timeOfInv = data.filter((element) => {
    return element.date === formattedDate;
  });

  const percentGain =
    ((curData.nav - timeOfInv[0].nav) / timeOfInv[0].nav) * 100;

  const gain = (percentGain * fund.amtInvested) / 100;
  const currValue = gain + fund.amtInvested;  

  return {
    fundName: fund.fundName,
    amtInvested: fund.amtInvested,
    code: fund.code,
    dateOfInvestment: fund.dateOfInvestment,
    currValue : currValue.toFixed(2),
    gain : gain.toFixed(2),
    percentGain : percentGain.toFixed(2),
  };
}

//get client Detail
router.get("/clientDetail", (req, res) => {
  const agentEmail = req.query.agentEmail;
  const clientEmail = req.query.clientEmail;
  Agent.findOne({ agentEmail })
    .then((agent) => {
      if (agent) {
        const client = agent.clients.find(
          (client) => client.clientEmail === clientEmail
        );
        if (client) {
          const clientName = client.clientName;
          const funds = client.funds;
          const data = [];

          const promises = funds.map((fund) => fetchSingleData(fund));
          Promise.all(promises).then((values) => {
            values.forEach((value) => {
              data.push(value);
            });
            return res.status(200).json({ clientName, data });
          });
        }
      } else {
        return res.status(404).json({ agentnotfound: "Agent not found" });
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(404).json({ err });
    });
});

// if (agent) {
//
//   if (client) {
//     console.log(client.funds[0]);
//     //get funds of the agent
//     const data = fetchSingleData(client.funds[0]).then((data) => {
//       console.log(data);
//     });
//     return res.status(200).json(data);
//   } else {
//     return res.status(404).json({ clientnotfound: "Client not found" });
//   }
// } else {
//   return res.status(404).json({ agentnotfound: "Agent not found" });
// }

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
