const express = require("express");
const mongoose = require("mongoose");
const app = express();


// to access the environment variables
require("dotenv").config();

// importing routes
const authRoute = require('./routes/auth');



// importing model
const ShortUrl = require("./models/urls");


// fixing views
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

// fetching all the shorturls
app.get("/", async (req, res) => {
  const allData = await ShortUrl.find();
  res.render("index", { shortUrls: allData });
});

// setting corresponding full url to short
app.post("/short", async (req, res) => {
  // parse the full url from the req.body
  const fullUrl = req.body.fullUrl;

  //insert the record using the model
  const record = new ShortUrl({
    full: fullUrl,
  });

  // save the record
  await record.save();

  // after pushing the data redirect to home
  res.redirect("/");
});

app.get("/:shortid", async (req, res) => {
  // grab the :shirtid param
  const shortid = "";

  // perform the mongoose call to find the long URL
  const data = await ShortUrl.findOne({ short: shortid });
  // if null, set status to 404 (res.sendStatus(404))
  if (!data) {
    return res.sendStatus(404);
  }
  // if not null, increment the click count in database
  data.clicks++;
  await data.save();

  // redirect the user to original link
  res.redirect(data.full);
});

// Connected to mongodb
mongoose.connect(process.env.MONGOURI,
  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  },
  ()=>console.log('connected to db')
);
var db = mongoose.connection;


// Middleware
app.use(express.json());

// route middlewares
app.use('/api/user', authRoute);

// connecting express to a particular port
app.listen(process.env.PORT, () => {
  console.log("Server is up and running on port: " + process.env.PORT);
});
