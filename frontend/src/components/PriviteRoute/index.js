import React, { useContext } from "react";
import Login from "../Login";

import { store } from "../../App";

import { useNavigate, Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useContext(store);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
