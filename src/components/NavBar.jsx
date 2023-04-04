// React
import { useState } from "react";
// Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
// Chakra-UI
import { Switch } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";

const NavBar = () => {
  const [mode, setMode] = useState("Light");
  const [loginStatus, setLoginStatus] = useState(false);
  const [accounName, setAccountName] = useState("Guest");
  
  return (
    <div className="nav-bar">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">HackZone</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/practice">Practice</Nav.Link>
              <Nav.Link href="/submissions">Submissions</Nav.Link>
              <Nav.Link href="/">
                <div className="theme-toggle d-flex align-items-center">
                  <Switch
                    className="pe-1"
                    size="sm"
                    colorScheme="teal"
                    onChange={() => {
                      if (mode === "Light") {
                        setMode("Dark");
                      } else {
                        setMode("Light");
                      }
                    }}
                  ></Switch>
                  <p className="px-1 m-0">{mode}</p>
                </div>
              </Nav.Link>
            </Nav>
            <Nav className="d-flex flex-row align-items-center">
              <Nav.Link className="ps-0 py-0 pe-2" href="/login">
                {loginStatus ? accounName: "Login" }
              </Nav.Link>
              {/* <Nav.Link className="ps-0 py-0 pe-2" href="/signup">
                SignUp
              </Nav.Link> */}
              <Nav.Link className="py-0 pe-0" href="#">
                <Avatar
                  size="sm"
                  bg="gray.500"
                />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
