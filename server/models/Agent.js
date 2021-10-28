const mongoose = require("mongoose");
const FundSchema = new mongoose.Schema({
  fundName: {
    type: String,
    required: true,
  },
  amtInvested: {
    type: Number,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  dateOfInvestment: {
    type: String,
    required: true,
  },
});

const ClientSchema = new mongoose.Schema({
  clientName: {
    type: String,
    required: true,
  },
  clientPassword: {
    type: String,
    required: true,
  },
  clientEmail: {
    type: String,
    required: true,
  },
  totalInvested: {
    type: Number,
  },
  funds: [FundSchema],
});

const AgentSchema = new mongoose.Schema({
  agentName: {
    type: String,
    required: true,
  },
  agentPassword: {
    type: String,
    required: true,
  },
  agentEmail: {
    type: String,
    required: true,
  },
  clients: [ClientSchema],
});

module.exports = Agent = mongoose.model("agents", AgentSchema);
