const express = require("express");
const router = express.Router();
const axios = require("axios");
const { parse } = require("date-fns");

router.get("/", async (req, res) => {
  try {
    const code = req.query.code;
    const doi = req.query.doi;
    let response = await axios
      .get(`https://api.mfapi.in/mf/${code}`)
      .then((resp) => {
        return resp.data;
      })
      .then((data) => {
        // map through and find lowest and highest
        let lowest = data.data[0].nav;
        let highest = data.data[0].nav;
        data.data.forEach((element) => {
          if (element.nav < lowest) {
            lowest = element.nav;
          }
          if (element.nav > highest) {
            highest = element.nav;
          }
        });

        //get the data at date of investment
        let timeOfInv = data.data.filter((element) => {
          return element.date === doi;
        });

        return res.status(200).json({ data, lowest, highest, timeOfInv });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(400).json({ success: false, err: error });
  }
});

router.get("/dates", async (req, res) => {
  try {
    const code = req.query.code;
    let response = await axios
      .get(`https://api.mfapi.in/mf/${code}`)
      .then((resp) => {
        return resp.data;
      })
      .then((data) => {
        let dates = data.data.map((element) => {
          return element.date;
        });
        return res.status(200).json({ dates });
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    res.status(400).json({ success: false, err: error });
  }
});

router.get("/range", async (req, res) => {
  try {
    const code = req.query.code;
    let response = await axios
      .get(`https://api.mfapi.in/mf/${code}`)
      .then((resp) => {
        const endDate = resp.data.data[0].date;
        const startDate = resp.data.data[resp.data.data.length - 1].date;
        return res.status(200).json({ startDate, endDate });
      });
  } catch (error) {
    res.status(400).json({ success: false, err: error });
  }
});

module.exports = router;
