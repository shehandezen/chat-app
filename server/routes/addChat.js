const express = require("express");
const Chat = require("../db/models/chat");
const { addData, getData } = require("../dbOperations");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newChat = {
      chat: [],
      creater: req.body.user,
      user: req.body.email,
    };

    data = await getData(
      {
        $or: [
          { creater: req.body.user, user: req.body.email },
          { creater: req.body.email, user: req.body.user },
        ],
      },
      Chat
    );

    if (data.length <= 0) {
      chat = await addData(newChat, Chat);
      res.status(201).json({
        status: "success",
        data: { chat },
      });
    } else {
      res.status(409).json({
        status: "error",
        data: { data },
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "failed",
      data: { error },
    });
  }
});

module.exports = router;
