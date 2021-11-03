const express = require("express");
const router = express.Router();

const AllFund = require("../../models/allfunds");

router.get("/", async (req, res) => {
  try {
    const search = req.query.search
      .split(" ")
      .map((str) => '"' + str + '"')
      .join(" ");
    const result = await AllFund.find({
      $text: { $search: search },
    }).limit(50);
    res.status(200).json({ success: true, data: result });
  } catch (err) {
    res.status(400).json({ success: false, err: error });
  }
});

module.exports = router;
