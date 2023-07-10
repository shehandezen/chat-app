const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
require("dotenv").config();

const addChat = require("./routes/addChat");
const deleteChat = require("./routes/deleteChat");
const getChats = require("./routes/getChats");
const getChat = require("./routes/getChat");
const updateChat = require("./routes/updateChat");
const connectDb = require("./db/connect");

//auth
const oauth = require("./oauth/oauth");
const authRequest = require("./oauth/authRequest");

const PORT = process.env.PORT || 5000;

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.CLIENT,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(
  cookieSession({
    name: "session",
    keys: ["secret"],
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
);

// cors middleware
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization,  X-PINGOTHER"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS"
  );
  next();
});

// check user logged in to the system
const isLoggedIn = (req, res, next) => {
  console.log(req.session);
  if (req.session.profile) {
    console.log("user logged in.");
    next();
  } else {
    res.status(401).json({
      status: "not authorized",
    });
  }
};

// connect db
connectDb(process.env.MONGODB_URL);

app.use("/chat", addChat);
app.use("/chat", deleteChat);
app.use("/chat", getChats);
app.use("/chat", getChat);
app.use("/chat", updateChat);
app.use("/google", oauth);
app.use("/google", authRequest);

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
