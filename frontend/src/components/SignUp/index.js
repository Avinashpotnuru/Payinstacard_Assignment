import React, { useContext, useState } from "react";

import "./index.css";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

import { store } from "../../App";

const SignUp = () => {
  const [auth, setAuth] = useContext(store);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState("");
  const [reserror, setResError] = useState("");

  const { username, email, password, confirmpassword } = newUser;

  const eventHandler = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };
  const sendUserDetails = () => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(newUser),
    };
    fetch("http://localhost:4000/signup", options)
      .then((res) => {
        console.log(res);
        if (res.ok) {
          setNewUser({
            username: "",
            email: "",
            password: "",
            confirmpassword: "",
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("data", data);
        toast(data?.message);
      })
      .catch((err) => {
        console.log("err", err);
        setResError(err?.error);

        toast.warn(err?.error);
      });
  };
  const signUpSubmitHandler = (e) => {
    e.preventDefault();

    console.log(newUser);

    if (password.length < 8) {
      setError("password length must be above 8");
    } else {
      setError("");
      sendUserDetails();
    }
  };
  return (
    <form onSubmit={signUpSubmitHandler}>
      <div className="form-group">
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={eventHandler}
          placeholder="Enter your username"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={eventHandler}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Password</label>
        <input
          type="text"
          id="password"
          name="password"
          value={password}
          maxLength={8}
          onChange={eventHandler}
          placeholder="Enter your password"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">confirm password</label>
        <input
          type="text"
          id="confirmpassword"
          name="confirmpassword"
          maxLength={8}
          value={confirmpassword}
          onChange={eventHandler}
          placeholder="Re Enter your password"
          required
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {reserror && <p style={{ color: "red" }}>{reserror}</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
