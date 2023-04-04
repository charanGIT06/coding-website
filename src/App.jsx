// React
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
// Chakra-UI
import { ChakraProvider } from "@chakra-ui/react";
// Components
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Practice from "./pages/Practice";
import Submissions from "./pages/Submissions";
// CSS
import "./css/index.css";

const loginStatus = JSON.parse(localStorage.getItem("loginStatus"));
console.log(loginStatus);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ChakraProvider>
    <React.StrictMode>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:account" element={<HomePage />} />
          <Route
            path="/dashboard"
            element={loginStatus ? <Dashboard /> :
            <HomePage />}
          />
          <Route path="/practice" element={<Practice />} />
          <Route path="/submissions" element={<Submissions />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </ChakraProvider>
);
