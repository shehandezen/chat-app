const express = require("express");
const Chat = require("../db/models/chat");
const { updateData } = require("../dbOperations");

const router = express.Router();

router.put("/:id", async (req, res) => {
  try {
    const updatedChat = await updateData(
      req.params.id,
      { $push: { chats: req.body } },
      Chat
    );
    res.status(200).json({
      status: "success",
      data: { updatedChat },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      data: { error },
    });
  }
});

module.exports = router;
