// React
import { useState } from "react";
// Chakra-UI
import { Input, InputGroup, Button, InputRightElement } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router-dom";

export default ({ route }) => {
  // const { route } = useParams();
  const navigate = useNavigate();

  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const toast = useToast();

  const routeTo = (route) => {
    navigate(route !== undefined ? `/${route}` : "/practice", {
      replace: true,
    });
  };

  const formValidation = () => {
    if (username === "") {
      toast({
        title: "Username is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (password === "") {
      toast({
        title: "Password is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }

    return true;
  };

  const login = () => {
    // Login Logic
    if (formValidation()) {
      const accounts = JSON.parse(localStorage.getItem("accounts"));
      const account =
        accounts.find((account) => JSON.parse(account).email === email) ||
        accounts.find((account) => JSON.parse(account).username === username);
      console.log("account: ", account);

      if (account != undefined && JSON.parse(account)) {
        if (JSON.parse(account).password == password) {
          // Login Success
          //   localStorage.setItem("account", JSON.stringify(account));
          if (localStorage.getItem("loginStatus")) {
            localStorage.setItem("loginStatus", JSON.stringify(true));
            const activeAccount = {
              username: JSON.parse(account).username,
              email: JSON.parse(account).email,
            };
            localStorage.setItem(
              "activeAccount",
              JSON.stringify(activeAccount)
            );
          }
          toast({
            title: "Login Successful",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          routeTo(route);
        } else {
          // Login Failed
          toast({
            title: "Incorrect Password",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      } else {
        // Login Failed
        toast({
          title: "Account does not exist",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  console.log("route: ", route);

  return (
    <div className="login-container">
      <div className="login-form d-flex flex-column justify-content-center px-3 py-3">
        <form action="" className="d-flex flex-column px-4 py-5">
          <h3 className="text-center mb-4 pb-4  ">Login to your account</h3>
          <label htmlFor="username">
            <Input
              className="input text-input mb-2"
              variant="outline"
              placeholder="Username"
              onChange={(e) => {
                setUserName(e.target.value);
                setEmail(e.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <InputGroup size="md">
              <Input
                className="input text-input mb-2"
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Enter password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <InputRightElement width="4.5rem">
                <Button
                  className="text-input mt-2"
                  h="1.75rem"
                  size="sm"
                  onClick={handleClick}
                >
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </label>
          <Button
            className="login-btn input mb-2"
            onClick={() => {
              login();
            }}
          >
            Login
          </Button>
          <p className="text-center">OR</p>
          <Button
            className="login-btn input mb-2"
            onClick={() => {
              routeTo("register");
            }}
          > 
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};
