import { useState, useEffect } from "react";
import axios from "axios";

import "./InfoBar.css";

const InfoBar = ({ setChat, chat, user }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    const config = {
      method: "DELETE",
      url: `${process.env.REACT_APP_API}/chat/${chat._id}`,
    };

    axios(config)
      .then((response) => {
        console.log(response);
        setChat("");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <div className="InfoBar">
      <button onClick={(e) => handleDelete(e)}>Delete</button>
    </div>
  );
};

export default InfoBar;
