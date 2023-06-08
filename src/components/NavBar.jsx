// React
import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
// Chakra-UI
import { Switch } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { Divider } from "@chakra-ui/react";

const NavBar = () => {

  const navigate = useNavigate();

  const [mode, setMode] = useState("Light");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [placement, setPlacement] = useState("right");
  // const [loginStatus, setLoginStatus] = useState(false);
  // const [accounName, setAccountName] = useState("Guest")
  let loginStatus = JSON.parse(localStorage.getItem("loginStatus"));
  let currentUser = "";
  let currentUserEmail = "";
  const location = window.location.href;

  if (loginStatus) {
    try {
      currentUser = JSON.parse(localStorage.getItem("activeAccount")).username;
      currentUserEmail = JSON.parse(
        localStorage.getItem("activeAccount")
      ).email;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="nav-bar">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand onClick={()=>{
            navigate("/login");
          }}><button>practice.code</button></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className=" me-auto">
              {/* <Nav.Link href="/dashboard">Dashboard</Nav.Link> */}
              <Nav.Link>
                <Link to="/practice" className="nav-link">
                  Practice
                </Link>
                {/* <Link to={'/practice'}>Practice</Link> */}
              </Nav.Link>
              {/* <Nav.Link href="/submissions">Submissions</Nav.Link> */}
              {/* <Nav.Link href="/">
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
              </Nav.Link> */}
            </Nav>
            <Nav className="d-flex flex-row align-items-center">
              <Nav.Link className="nav-link ps-0 py-0 pe-2">
                <Link className="nav-link" to="/login">
                  {loginStatus && currentUser !== ""
                    ? `Hey, ${currentUser}`
                    : "Login"}
                </Link>
              </Nav.Link>
              {/* <Nav.Link className="ps-0 py-0 pe-2" href="/signup">
                SignUp
              </Nav.Link> */}
              <Nav.Link className="py-0 pe-0" href="#">
                <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
                  <DrawerOverlay />
                  <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                      <div className="account d-flex">
                        <div className="account__avatar ">
                          <Avatar size="lg" bg="gray.500" />
                        </div>
                        <div className="account__name ps-3">
                          <h4 className="green-text">Hey, {currentUser}</h4>
                          <p className="green-text small">{currentUserEmail}</p>
                        </div>
                      </div>
                    </DrawerHeader>
                    <DrawerBody>
                      <Button className="green-btn-outline" variant="outline" mr={3} onClick={onClose}>
                        Cancel
                      </Button>
                      <Button
                      className="green-btn"
                        onClick={() => {
                          localStorage.setItem("loginStatus", false);
                          localStorage.setItem("activeAccount", null);
                          // window.location = "/";
                          navigate("/login");
                        }}
                      >
                        Log Out
                      </Button>
                      <Divider />
                    </DrawerBody>
                    {/* <DrawerFooter borderTopWidth="1px">
                    </DrawerFooter> */}
                  </DrawerContent>
                </Drawer>
                <Avatar
                  size="sm"
                  bg="gray.500"
                  onClick={
                    loginStatus
                      ? onOpen
                      : () => {
                          window.location = "/login";
                        }
                  }
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
