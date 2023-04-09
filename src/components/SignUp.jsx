// React
import { useState } from "react";
import { Link } from "react-router-dom";
// Chakra-UI
import { Input, InputGroup, Button, InputRightElement } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { Alert, AlertIcon, Box, AlertDescription } from "@chakra-ui/react";

export default () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const toast = useToast();

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
    if (email === "") {
      toast({
        title: "Email is required",
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
    if (confirmPassword === "") {
      toast({
        title: "Confirm Password is required",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return false;
    }
    return true;
  };

  const signup = () => {
    const accounts = JSON.parse(localStorage.getItem("accounts"));
    console.log(accounts);
    let usernameStatus = false;
    let emailStatus = false;

    for (let i = 0; i < accounts.length; i++) {
      if (JSON.parse(accounts[i]).username === username) {
        usernameStatus = true;
        alert("Username Exists");
        break;
      }
      if (JSON.parse(accounts[i]).email == email) {
        emailStatus = true;
        alert("Email Exists");
        break;
      }
    }

    if (!usernameStatus && !emailStatus && formValidation()) {
      accounts.push(
        JSON.stringify({
          username: username,
          email: email,
          password: password,
        })
      );
      localStorage.setItem("accounts", JSON.stringify(accounts));
      return true;
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form d-flex flex-column justify-content-center px-3">
        <form action="" className="d-flex flex-column px-4">
          <h3 className="text-center mb-4">Create your account</h3>
          {/* Username */}
          <Input
            className="input text-input mb-2"
            variant="outline"
            placeholder="Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          {/* Email */}
          <Input
            className="input text-input email mb-2"
            variant="outline"
            placeholder="Enter Email"
            type="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          {/* Password */}
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
          {/* Confirm Password */}
          <InputGroup size="md">
            <Input
              className="input text-input mb-2"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Confirm password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
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
          {/* Sign Up */}
          <Button
            className="input login-btn"
            colorScheme="green"
            onClick={() => {
              if (password !== confirmPassword) {
                toast({
                  title: "Passwords do not match",
                  description: "Please re-enter your password",
                  status: "error",
                  duration: 9000,
                  isClosable: true,
                });
              } else {
                if (signup()) {
                  toast({
                    title: "Success",
                    description: "Account Created",
                    status: "success",
                    duration: 9000,
                    isClosable: true,
                  });
                }
              }
            }}
          >
            Sign Up
          </Button>
          <p className="m-0 py-3 text-center">OR</p>
          {/* Login */}
          <Link to="/login" className="input mb-2 w-100">
            <Button
              className="input login-btn mb-2"
              // onClick={() => {
              //   window.location.href = "/login";
              // }}
            >
              Login
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
};
