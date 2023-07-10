import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import queryString from "query-string";

import "./Container.css";

import Main from "../Main/Main";
import ChatContainer from "../ChatContainer/ChatContainer";

const Container = () => {
  const [chat, setChat] = useState("");
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const setOrGetUser = async () => {
    const query = queryString.parse(location.search);
    if (
      Object.hasOwn(query, "access_token") &&
      Object.hasOwn(query, "userId") &&
      Object.hasOwn(query, "name") &&
      Object.hasOwn(query, "email") &&
      Object.hasOwn(query, "picture")
    ) {
      await localStorage.setItem("user", JSON.stringify(query));
      await setUser(query);
      console.log(query);
    } else {
      if (localStorage.getItem("user")) {
        await setUser(JSON.parse(localStorage.getItem("user")));
      } else {
        navigate("/");
      }
    }
  };
  useEffect(() => {
    setOrGetUser();
  }, []);

  return (
    <div className="Container">
      <Main setChat={setChat} chat={chat} user={user} />
      <ChatContainer setChat={setChat} chat={chat} user={user} />
    </div>
  );
};

export default Container;
