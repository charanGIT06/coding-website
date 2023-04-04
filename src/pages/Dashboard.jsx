import { CardFooter, Divider } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, Heading, Text } from "@chakra-ui/react";

export default () => {
  let currentAccount = JSON.parse(localStorage.getItem("activeAccount"));
  console.log(currentAccount);

  return (
    <div className="dashboard">
      <div className="container">
        <div className="greeting pt-5 pb-3">
          <h1>Hello, {currentAccount.username}</h1>
          <p className="m-0">Ready to Code?</p>
        </div>
        <div className="user-info d-flex justify-content-center pb-4 gap-3">
          <Card
            varient="elevated"
            size="md"
            className="user-info-card px-3 shadow"
          >
            <CardHeader>
              <Heading size="md"> Python</Heading>
            </CardHeader>
            <CardBody>
              <Text>Satus</Text>
            </CardBody>
            <CardFooter>
              <Text>variant = variant</Text>
            </CardFooter>
          </Card>
          <Card
            variant="elevated"
            size="md"
            className="user-info-card px-3 shadow"
          >
            <CardHeader>
              <Heading size="md">Java</Heading>
            </CardHeader>
            <CardBody>
              <Text>Status</Text>
            </CardBody>
            <CardFooter>
              <Text>variant = variant</Text>
            </CardFooter>
          </Card>
        </div>
        <Divider />
        <div className="row">
          <h3>Question Cards Appear Here</h3>
        </div>
      </div>
    </div>
  );
};
