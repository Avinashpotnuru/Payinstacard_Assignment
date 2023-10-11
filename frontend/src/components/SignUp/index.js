import React, { useContext, useState } from "react";

import "./index.css";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { Navigate, useNavigate } from "react-router-dom";

import { store } from "../../App";

const SignUp = () => {
  const [auth, setAuth] = useContext(store);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const navigate = useNavigate();

  const [error, setError] = useState("");

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
            name: "",
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
        setAuth(true);
        navigate("/");

        setError(data);
      })
      .catch((err) => {
        console.log("err", err);
        setError(err?.message);

        toast.warn(err);
      });
  };
  const signUpSubmitHandler = (e) => {
    e.preventDefault();

    console.log(newUser);

    sendUserDetails();
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
          value={confirmpassword}
          onChange={eventHandler}
          placeholder="Re Enter your password"
          required
        />
      </div>
      {/* {error ? <p style={{ color: "red" }}>{error}</p> : ""} */}

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;
