import "../css/homepage.css";
// React
import { useState } from "react";
import { useParams } from "react-router-dom";

// Components
import Login from "../components/Login";
import SignUp from "../components/SignUp";

export default () => {
  let { account } = useParams();
  console.log(account);

  //   Setting Up Accounts
  if (!localStorage.getItem("accounts")) {
    localStorage.setItem("accounts", JSON.stringify([]));
  }

  return (
    <div className="home-page">
      <div className="container">
        <div className="row">
          <div className="left col-md-7">
            <h1>Skills speak louder than words</h1>
          </div>
          <div className="right col-md-5">
            {account === "login" ? <Login /> : <SignUp />}
          </div>
        </div>
      </div>
    </div>
  );
};
