import React, { useContext } from "react";

import "./index.css";

import { Link } from "react-router-dom";
import { store } from "../../App";
const pages = [
  { tab: "Home", path: "/" },
  { tab: "Contact", path: "/contact" },
  { tab: "My Profile", path: "/users" },
];

const Header = () => {
  const [auth, setAuth] = useContext(store);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setAuth(false);

    document.location.reload();
  };
  return (
    <div className="header">
      <ul>
        {pages?.map((item, idx) => (
          <Link to={item?.path}>
            <li key={idx}>{item?.tab}</li>
          </Link>
        ))}
      </ul>
      <button onClick={logoutHandler}>logout</button>
    </div>
  );
};

export default Header;
