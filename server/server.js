const express = require("express");
const mongoose = require("mongoose");
const app = express();
const passport = require("passport");

const users = require("./routes/api/users");


app.use(express.urlencoded({extended: true}));
app.use(express.json())

// DB Config
const db = require("./config/keys").MONGOURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);





const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));