import React, { useContext, useState } from "react";

import "./index.css";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { Navigate, useNavigate, redirect } from "react-router-dom";

import { store } from "../../App";

import SignUp from "../SignUp";

const Login = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useContext(store);

  console.log("auth=======", auth);

  // console.log(navigate);

  const [tab, active] = useState(1);

  const [error, setError] = useState("");

  const [reserror, setResError] = useState("");

  const [user, setUser] = useState({ email: "", password: "" });

  const { email, password } = user;

  const loginEventHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const saveTokeInLocal = (token) => {
    localStorage.setItem("token", token);
  };

  const token = localStorage.getItem("token");

  const sendLoginDetails = async () => {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    };
    await fetch("http://localhost:4000/login", options)
      .then((res) => {
        console.log(res);
        if (res.ok) {
          setUser({ email: "", password: "" });
          // setAuth(true);
        }
        return res.json();
      })
      .then((data) => {
        toast(data?.message);

        saveTokeInLocal(data?.token);
        setAuth(data?.token);
      })
      .catch((err) => {
        console.log("err", err);
        setResError(err?.error);

        toast.warn(err?.error);
      });
  };

  const LoginSubmitHandler = (e) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("password length must be above 8");
    } else {
      setError("");
      sendLoginDetails();
      console.log(user);
    }
  };

  if (auth) {
    navigate("/");
  }

  return (
    <div className="login-container">
      <div className="tabs">
        <h4
          style={{ textDecoration: tab === 1 ? "underline" : "" }}
          onClick={() => active(1)}
        >
          login
        </h4>
        <h4
          style={{ textDecoration: tab === 2 ? "underline" : "" }}
          onClick={() => active(2)}
        >
          signup
        </h4>
      </div>

      {tab === 1 ? (
        <form onSubmit={LoginSubmitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={loginEventHandler}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Password</label>
            <input
              type="text"
              id="password"
              name="password"
              value={password}
              maxLength={8}
              onChange={loginEventHandler}
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {reserror && <p style={{ color: "red" }}>{reserror}</p>}
          <button type="submit">Login</button>
        </form>
      ) : (
        <SignUp />
      )}
    </div>
  );
};

export default Login;
