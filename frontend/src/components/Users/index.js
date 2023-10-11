import React, { useEffect, useState } from "react";
import "./index.css";
const Users = () => {
  const [user, setUser] = useState({});

  const token = localStorage.getItem("token");

  const getUserData = async () => {
    const response = await fetch("http://localhost:4000/userdetails", {
      headers: {
        "x-token": token,
      },
    });

    const data = await response.json();

    // console.log(data);
    setUser(data);
  };

  console.log("user", user);

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <h1>User Details</h1>

      <table>
        <tr>
          <th>USER NAME</th>
          <th>EMAIL</th>
          <th>PASSWORD</th>
        </tr>
        <td>{user?.username}</td>
        <td>{user?.email}</td>
        <td>{user?.password}</td>
      </table>
    </div>
  );
};

export default Users;
