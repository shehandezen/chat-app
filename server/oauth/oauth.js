const express = require("express");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const User = require("../db/models/user");
require("dotenv").config();

const router = express.Router();

const getUserData = async (access_token) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  const data = await response.json();
  console.log(data);
  return data;
};

router.get("/oauth", async (req, res) => {
  const code = req.query.code;
  try {
    const redirectUrl = process.env.GOOGLE_CALLBACK_URL;
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      redirectUrl
    );
    const result = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(result.tokens);
    console.log("token aquired");

    const user = oAuth2Client.credentials;
    console.log("user", user);
    const userData = await getUserData(user.access_token);
    const existingUser = await User.find({ userId: userData.sub });
    console.log("existingUser", existingUser);
    const userFormat = {
      userId: userData.sub,
      fullName: userData.name,
      email: userData.email,
      picture: userData.picture,
    };
    if (existingUser.length <= 0) {
      const newUser = new User(userFormat);
      newUser.save();
      console.log("new user created");
    }
    req.session.profile = userFormat;

    console.log(req.session);

    res.redirect(
      `${process.env.CLIENT_URL}/chat?userId=${userData.sub}&name=${userData.name}&email=${userData.email}&picture=${userData.picture}&access_token=${user.access_token}`
    );
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  req.session = null;
  res.redirect(process.env.CLIENT_URL);
});

module.exports = router;
