import { useState, useEffect } from "react";
import axios from "axios";

import "./SendMessage.css";

const SendMessage = ({ chat, user }) => {
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("User");
  const [reciever, setReciever] = useState("");
  const [time, setTime] = useState("");
  const [mediaType, setMediaType] = useState("text");
  const [messageStatus, setMessageStatus] = useState("delivered");

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    if (chat.creater == user.email) {
      setReciever(chat.user);
    } else {
      setReciever(chat.creater);
    }
  }, [chat]);

  const sendMessage = async (e) => {
    e.preventDefault();
    console.log(chat.creater, chat.user);
    // const config = {
    //   method: "PUT",
    //   url: `${process.env.REACT_APP_API}/chat/${chat._id}`,
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: JSON.stringify({
    //     type: messageType,
    //     sender: sender,
    //     reciever: reciever,
    //     body: message,
    //     time: time,
    //     mediaType: mediaType,
    //     status: messageStatus,
    //   }),
    // };

    await axios
      .put(`${process.env.REACT_APP_API}/chat/${chat._id}`, {
        Messagetype: messageType,
        sender: user.email,
        reciever: reciever,
        body: message,
        time: time,
        mediaType: mediaType,
        status: messageStatus,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    setMessage("");
  };

  return (
    <div className="SendMessage">
      <input
        placeholder="message"
        value={message}
        onChange={(e) => handleInputChange(e)}
      />
      <button onClick={(e) => sendMessage(e)}> send </button>
    </div>
  );
};

export default SendMessage;
