import "../css/homepage.css";
// React
import { useState } from "react";
import { useParams } from "react-router-dom";
// Chakra-UI
import { Divider } from "@chakra-ui/react";

// Components
import Login from "../components/Login";
import SignUp from "../components/SignUp";

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
    <div className="home-page">
      <div className="container">
        <div className="row">
          <div className="left d-flex flex-column justify-content-center col-md-7 pe-5">
            <h1 className="pb-4">Skills speak louder than words</h1>
            <p>
              Our website is designed to provide you with a fun and challenging
              platform to showcase your coding skills. With our wide range of
              coding challenges, you can test your skills in a variety of
              programming languages and problem-solving scenarios.
            </p>
            <Divider></Divider>
            <p>
              Whether you're a beginner or an experienced programmer, our
              challenges will help you improve your coding skills, learn new
              programming techniques, and keep your coding skills sharp. Our
              platform also offers coding competitions where you can compete
              with other programmers and showcase your skills in real-time.
            </p>
          </div>
          <div className="right col-md-5">
            {account === "login" ? <Login /> : <SignUp />}
          </div>
        </div>
      </div>
    </div>
  );
};
