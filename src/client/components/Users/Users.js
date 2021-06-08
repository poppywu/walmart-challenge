import React, { useState, useEffect } from "react";
import axios from "axios";
import MyTable from "../MyTable/MyTable";
import "./Users.css";
import client from '../../apollo-client';
import { gql } from "@apollo/client";

// const GET_USERS=gql`
// {
//   getAllUser{
//     username
//     age
//   }
// }
// `;
function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios.get("/users").then((response) => setUsers(response.data));
    //const {data}=await client.query({query:GET_USERS});
    //setUsers(data.getAllUser);
  }, []);
  return (
    <div className="users">
      <h1 className="users__title">All Users</h1>
      <p>Users and their age</p>
      <MyTable tableHeader={["Username", "Age"]} data={users} />
    </div>
  );
}

export default Users;
