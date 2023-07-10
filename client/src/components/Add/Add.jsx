import { useState } from "react";

import axios from "axios";

import "./Add.css";

const Add = ({ setChat, user }) => {
  const [email, setEmail] = useState("");
  const USER = "admin@email.com";
  const URL = "https://z4hhls-5000.csb.app";

  const inputHandle = (e) => {
    setEmail(e.target.value);
  };

  const dataValidate = () => {
    if (!user || email.length <= 0) {
      return false;
    } else {
      return true;
    }
  };

  const submitHandle = (e) => {
    e.preventDefault();

    if (dataValidate()) {
      const config = {
        method: "POST",
        url: `${process.env.REACT_APP_API}/chat/`,
        headers: {
          "Content-Type": "application/json",
        },
        data: JSON.stringify({ user: user.email, email: email }),
      };

      axios(config)
        .then((response) => {
          console.log(response.data.data.chat);
          setChat(response.data.data.chat);
        })
        .catch((error) => {
          if (error.response.status == 409) {
            console.log("chat already exists!");
          }
          console.log(error.response.data);
        });
      setEmail("");
    } else {
      console.log("invalid");
    }
  };

  return (
    <div className="Add">
      <form onSubmit={(e) => submitHandle(e)}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => inputHandle(e)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Add;
