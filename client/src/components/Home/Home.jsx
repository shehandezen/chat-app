import React, { useState, useId } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const id = useId();
  const navigate = useNavigate();

  const authNavigation = (url) => {
    window.location.href = url;
  };

  const auth = async () => {
    await axios
      .post(process.env.REACT_APP_AUTH_REQUSET)
      .then((response) => {
        console.log(response);
        authNavigation(response.data.url);
      })
      .catch((error) => console.log(error));
  };

  return (
  <button onClick={() => auth()} className="button">
          sign in
        </button>);
};

export default Home;
