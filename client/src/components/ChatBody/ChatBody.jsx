import { useState, useEffect } from "react";
import axios from "axios";

import "./ChatBody.css";

import Message from "../Message/Message";

const ChatBody = ({ chat, user }) => {
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    const config = {
      method: "GET",
      url: `${process.env.REACT_APP_API}/chat/${chat.creater}/${chat.user}`,
    };

    await axios(config)
      .then(async (response) => {
        console.log(response.data.data.data[0].chats);
        await setMessages(response.data.data.data[0].chats);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    console.log(chat);
  };

  useEffect(() => {
    getMessages();
  }, [user, chat]);
  return (
    <div className="ChatBody">
      {messages.map((message) => (
        <div>
          {message.body}
          <Message />
        </div>
      ))}
    </div>
  );
};

export default ChatBody;
