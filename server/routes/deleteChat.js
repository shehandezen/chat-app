const express = require("express");
const Chat = require("../db/models/chat");
const { deleteData } = require("../dbOperations");

const router = express.Router();

router.delete("/:id", async (req, res) => {
  try {
    const deletedChat = await deleteData(req.params.id, Chat);
    res.status(204).json({
      status: "success",
      data: { deletedChat },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      data: { error },
    });
  }
});

module.exports = router;
