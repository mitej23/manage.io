const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const code = req.query.code;
    let response = await axios
      .get(`https://api.mfapi.in/mf/${code}`)
      .then((resp) => {
        return res.status(200).json(resp.data);
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
