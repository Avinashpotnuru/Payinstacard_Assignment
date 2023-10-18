import React, { useContext } from "react";

import { store } from "../../App";

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [auth, setAuth] = useContext(store);

  const token = localStorage.getItem("token");

  console.log(token);

  console.log(auth);

  return token ? children : <Navigate to="/login" replace={true} />;
};

export default PrivateRoute;
