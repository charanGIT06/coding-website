import "../css/practice.css";
import { Link } from "react-router-dom";
// Chakra-UI
import { Divider } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import data from "../data/data.json";

export default () => {
  const languages = ["Python", "Java", "C++", "Javascript"];
  localStorage.setItem("data", JSON.stringify(data));

  return (
    <div className="practice-page">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="greeting pt-4 pb-3">
              <h1>Practice</h1>
              <p className="m-0">Ready to Code?</p>
            </div>
            <Divider />
            <div className="languages-container container pt-0 px-0 pb-3 m-0">
              <div className="row d-flex justify-content-start">
                <h6 className="pb-3">Select a Language</h6>
                {languages.map((language) => {
                  return (
                    <div className="col-3">
                      <div
                        className="language-card shadow-lg rounded py-3 px-4 me-2 mb-3"
                        key={language}
                      >
                        <div className="card-header">
                          <h5 className="card-title pb-4">{language}</h5>
                        </div>
                        <Button colorScheme="green">Start</Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <Divider />
            <div className="questions-container container pt-0 px-0 pb-3 m-0">
              <div className="row d-flex justify-content-start">
                <h6 className="pb-3">Questions</h6>
                {data["python-questions"].map((question) => {
                  return (
                    <div className="col-12" key={question.qid}>
                      <div className="question-card rounded shadow-lg d-flex py-3 px-4 mb-4">
                        <div className="question-card-left">
                          <div className="card-header">
                            <h5 className="card-title pb-2">
                              {question.questionTitle}
                            </h5>
                            <div className="card-body d-flex">
                              <p className="me-2 m-0 pe-1">
                                <span className="question-props pe-1">
                                  Tags:
                                </span>{" "}
                                {question.tags}
                              </p>
                              <p className="me-2 m-0">
                                <span className="question-props pe-1 m-0">
                                  Difficulty:
                                </span>{" "}
                                {question.difficulty}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="question-card-right d-flex flex-column justify-content-center">
                          <Link
                            to={
                              "/codingpage/" +
                              "python/" +
                              question.qid +
                              "/" +
                              question.questionTitle
                            }
                          >
                            <Button colorScheme="green" variant="outline">
                              Solve
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
