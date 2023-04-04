// React
import { useState } from "react";
// Chakra-UI
import { Input, InputGroup, Button, InputRightElement } from "@chakra-ui/react";

export default () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return (
    <div className="login-form d-flex flex-column justify-content-center px-3">
      <form action="" className="d-flex flex-column">
        <h3 className="text-center mb-4">Login to your account</h3>
        <label htmlFor="username">
          <Input
            className="input mb-2"
            variant="outline"
            placeholder="Username"
          />
        </label>
        <label htmlFor="password">
          <InputGroup size="md">
            <Input
              className="input mb-2"
              pr="4.5rem"
              type={show ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </label>
        <Button className="input mb-2" colorScheme="green">
          Login
        </Button>
      </form>
    </div>
  );
};
