import { useState, useEffect } from "react";
import axios from "axios";

import "./ListView.css";

import ListItem from "../ListItem/ListItem";

const ListView = ({ setChat, chat, user }) => {
  const [chatList, setChatList] = useState([]);
  const getChats = async () => {
    const config = {
      method: "GET",
      url: `${process.env.REACT_APP_API}/chat/${user.email}`,
    };

    await axios(config)
      .then((response) => {
        console.log(response.data.data.data);
        setChatList(response.data.data.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  useEffect(() => {
    getChats();
  }, [user, chat]);

  const handleSelectChat = (data) => {
    console.log("clicked");
    console.log(data);
    setChat(data);
  };

  return (
    <div className="ListView">
      {chatList.map((data) => (
        <div onClick={() => handleSelectChat(data)}>
          <p>{data.user}</p>
          <ListItem />
        </div>
      ))}
    </div>
  );
};

export default ListView;
