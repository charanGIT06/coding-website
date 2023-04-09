import "../css/homepage.css";
// React
import { useState } from "react";
import { useParams } from "react-router-dom";
// Chakra-UI
import { Divider } from "@chakra-ui/react";

// Components
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import NavBar from "../components/NavBar";

export default () => {
  let { account } = useParams();
  // console.log(account);

  //   Setting Up Accounts
  if (!localStorage.getItem("accounts")) {
    localStorage.setItem("accounts", JSON.stringify([]));
  }
  //   Login Status
  if (!localStorage.getItem("loginStatus")) {
    localStorage.setItem("loginStatus", JSON.stringify(false));
  }

  return (
    <div className="page">
      <NavBar />
      <div className="home-page">
        <div className="container">
          <div className="row">
            <div className="left d-flex flex-column justify-content-center col-md-7 pe-5">
              <h1 className="caption pb-4">Skills speak louder than words</h1>
              <p className="caption-text">
                Practice coding skills with our interactive coding challenges
                and a full suite of code editors. Our platform offers a variety
                of programming languages, including Python, Java, C++, and
                JavaScript.
              </p>
              <Divider />
            </div>
            <div className="right col-md-5">
              {account === "login" ? <Login /> : <SignUp />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
