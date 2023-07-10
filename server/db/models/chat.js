const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  id: String,
  chats: [
    {
      Messagetype: String,
      sender: String,
      reciever: String,
      body: String,
      time: String,
      mediaType: String,
      status: String,
    },
  ],
  creater: String,
  user: String,
});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
