// React
import { Link } from "react-router-dom";
// Chakra-UI
import { Button } from "@chakra-ui/react";

export default ({question}) => {
  let id = 1
  return (
    <div className="col-12" key={id++}>
      <div className="question-card  rounded shadow-lg d-flex py-3 px-4 mb-4">
        <div className="question-card-left">
          <div className="card-header">
            <h5 className="card-title pb-2">{question.questionTitle}</h5>
            <div className="card-body d-flex">
              {(["language", "tags", "difficulty"]).map((prop) => {
                return (
                  <p className="me-2 m-0 pe-1">
                    <span className="question-props pe-1">{prop.substring(0, 1).toUpperCase()+prop.substring(1,)+":"}</span>
                    {question[prop]}
                  </p>
                );
              }
                )}
            </div>
          </div>
        </div>
        <div className="question-card-right d-flex flex-column justify-content-center">
          <Link
            to={
              "/codingpage/" +
              question.language +"/"+
              question.qid +
              "/" +
              question.questionTitle
            }
          >
            <Button variant="outline" className="input question-card-btn">
              Solve
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
