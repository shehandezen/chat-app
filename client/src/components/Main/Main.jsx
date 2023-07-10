import { useState, useEffect } from "react";

import "./Main.css";

import Header from "../Header/Header";
import ListView from "../ListView/ListView";
import Add from "../Add/Add";

const Main = ({ setChat, chat, user }) => {
  return (
    <div className="Main">
      <Header />
      <ListView setChat={setChat} chat={chat} user={user} />
      <Add setChat={setChat} user={user} />
    </div>
  );
};

export default Main;
