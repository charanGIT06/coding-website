import "../css/practice.css";
import { Link } from "react-router-dom";
// Chakra-UI
import { Divider } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

const data = {
  "python-questions": [
    {
      qid: "py-1",
      language: "python",
      questionTitle: "Count the string",
      description:
        "Given a string consisting of only alphabets and characters, print the count of the alphabets and numbers respectively. If either count is equal to zero, do not print the corresponding result.",
      constraints: "String without any special characters",
      inputFormat: "A string of alphabets and numbers",
      outputFormat: "Alphabets: (count)  Numbers: (count)",
      sampleInput: "July2022",
      sampleOutput: ["Alphabets: 4", "Numbers: 4"],
      explanation:
        "In the given string, there are 4 alphabet characters and 4 numeric characters.",
      tags: "string, count",
      difficulty: "easy",
      testCases: [
        {
          input: "July2022",
          output: ["Alphabets: 4", "Numbers: 4"],
        },
        {
          input: "enTeR79257",
          output: ["Alphabets: 5", "Numbers: 5"],
        },
      ],
    },
    {
      qid: "py-2",
      language: "python",
      questionTitle: "Position of character",
      description:
        "Write a python code to print the position or index of a given character from the given of string.",
      constraints: "",
      inputFormat:
        "A string of alphabets and numbers and the required character",
      outputFormat: "Position of the character",
      sampleInput: "Hello Good Morning     G",
      sampleOutput: "7",
      tags: "string, position",
      difficulty: "easy",
      explanation: "The character 'G' is present in the 7th position",
      testCases: [
        {
          input: "Hello Good Morning   G",
          output: "7",
        },
        {
          input: "abcd123Fghy    1",
          output: "5",
        },
      ],
    },
    {
      qid: "py-3",
      language: "python",
      questionTitle: "n characters from middle",
      description:
        "Given a string, print the n number of characters from the middle of the string",
      constraints: "n>length of string/2",
      inputFormat: "A string of alphabets and numbers and the required number",
      outputFormat: "The required sring of characters",
      sampleInput: "have123fun 2",
      sampleOutput: "12",
      tags: "string, position",
      difficulty: "easy",
      explanation:
        "The middle position is 5 for the string, as such 2 characters from position 5",
      testCases: [
        {
          input: "have123fun  2",
          output: "12",
        },
        {
          input: "GoodMorning  4",
          output: "orni",
        },
      ],
    },
    {
      qid: "py-4",
      language: "python",
      questionTitle: "Greater than average",
      description:
        "Given a list of integers, print all the integers greater than the average of the given integers",
      constraints: "n>0",
      inputFormat: "List of numbers",
      outputFormat: "List of numbers",
      sampleInput: "12 13 14 15 16",
      sampleOutput: "15 16",
      tags: "list, average",
      difficulty: "easy",
      explanation: "Average of the given list = 14. Numbers greater than 14",
      testCases: [
        {
          input: "12 13 14 15 16",
          output: "15 16",
        },
        {
          input: "100 200 300 400",
          output: "300 400",
        },
      ],
    },
    {
      qid: "py-5",
      language: "python",
      questionTitle: "Operation based on position",
      description:
        "Given a set of integers. Calculate the sum of integers present in the odd position in the list and multiplication of integers in the even position",
      constraints: "n>0",
      inputFormat: "List of integers",
      outputFormat: "Two integers",
      sampleInput: "12 13 14 15 16",
      sampleOutput: "42 195",
      tags: "list, position",
      difficulty: "easy",
      explanation:
        "12 14 and 16 are in odd position, so add them. 13 and 15 are in even postion, so multiply them",
      testCases: [
        {
          input: "12 13 14 15 16",
          output: "42 195",
        },
        {
          input: "10 20 30 40 50 60",
          output: "90 48000",
        },
      ],
    },
  ],
};

export default () => {
  const languages = ["python", "java", "cpp", "javascript"];
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
