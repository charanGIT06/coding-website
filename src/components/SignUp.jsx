// React
import { useState } from "react";
// Chakra-UI
import { Input, InputGroup, Button, InputRightElement } from "@chakra-ui/react";

export default () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const registerAccount = () => {
    
  }

  return (
    <div className="signup-form d-flex flex-column justify-content-center px-3">
      <form action="" className="d-flex flex-column">
        <h3 className="text-center mb-4">Create your account</h3>
        <Input
          className="input mb-2"
          variant="outline"
          placeholder="Username"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <Input
          className="input email mb-2"
          variant="outline"
          placeholder="Enter Email"
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <InputGroup size="md">
          <Input
            className="input mb-2"
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <InputGroup size="md">
          <Input
            className="input mb-2"
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
        <Button
          className="input mb-2"
          colorScheme="green"
          onClick={() => {
            console.log("Username: ", username);
            console.log("Email:", email);
            console.log("Password: ", password);
            console.log("Confirm Password: ", confirmPassword);
            registerAccount();
          }}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};
