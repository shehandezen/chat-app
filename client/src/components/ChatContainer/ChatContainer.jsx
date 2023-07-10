import { useState, useEffect } from "react";

import "./ChatContainer.css";

import InfoBar from "../InfoBar/InfoBar";
import ChatBody from "../ChatBody/ChatBody";
import SendMessage from "../SendMessage/SendMessage";

const ChatContainer = ({ setChat, chat, user }) => {
  return (
    <div className="ChatContainer">
      {chat ? (
        <>
          <InfoBar setChat={setChat} chat={chat} user={user} />
          <ChatBody chat={chat} user={user} />
          <SendMessage chat={chat} user={user} />
        </>
      ) : (
        "no chat selected"
      )}
    </div>
  );
};

export default ChatContainer;
