const mongoose = require('mongoose');

const AllFundSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  from_date: {
    type: String,
    required: true,
  },
  to_date: {
    type: String,
    required: true,
  },
});

AllFundSchema.index({ name: "text" });

module.exports = AllFund = mongoose.model("allfunds", AllFundSchema);
