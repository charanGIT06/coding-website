// React
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Components
import QuestionCard from "../components/QuestionCard";
import "../css/practice.css";
import NavBar from "../components/NavBar";
// Chakra-UI
import { Divider } from "@chakra-ui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import data from "../data/data.json";
import { Select } from "@chakra-ui/react";

export default () => {
  const navigate = useNavigate();

  const languages = ["Python", "Java", "Cpp", "Javascript"];
  localStorage.setItem("data", JSON.stringify(data));

  const [selectStyle, setSelectStyle] = useState("outline");
  const [difficultyStyle, setDifficultyStyle] = useState("outline");

  const [language, setLanguage] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  const [questions, setQuestions] = useState(data["questions"]);

  useEffect(() => {
    if (language !== "All") {
      setQuestions(
        data["questions"].filter((question) => {
          return (
            question["language"] === language.toLowerCase() &&
            (difficulty !== "All"
              ? `${question["difficulty"] === difficulty.toLowerCase()}`
              : true)
          );
        })
      );
    } else {
      setQuestions(data["questions"]);
    }
  }, [language]);

  useEffect(() => {
    if (difficulty !== "All") {
      setQuestions(
        data["questions"].filter((question) => {
          return (
            question["language"] === language.toLowerCase() &&
            question["difficulty"] === difficulty.toLowerCase()
          );
        })
      );
    } else {
      setQuestions(data["questions"]);
    }
  }, [difficulty]);

  return (
    <div className="page">
      <NavBar />
      <div className="practice-page green-text">
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
                  <div className="filter-section row d-flex flex-row justify-content-center">
                    <div className="col-md-6 col-12 p-2">
                      <div className="filter-section-left w-100">
                        <h6 className="">Language</h6>
                        <Select
                          variant={selectStyle}
                          colorScheme="green"
                          color={selectStyle === "filled" ? "green" : ""}
                          onChange={(e) => {
                            setLanguage(e.target.value);
                            setSelectStyle("filled");
                          }}
                        >
                          <option selected className="option" value="All">
                            All
                          </option>
                          <option className="option" value="python">
                            Python
                          </option>
                          <option className="option" value="java">
                            Java
                          </option>
                          <option className="option" value="cpp">
                            C++
                          </option>
                          <option className="option" value="javascript">
                            Javascript
                          </option>
                        </Select>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 p-2">
                      <div className="filter-section-right w-100">
                        <h6 className="">Difficulty</h6>
                        <Select
                          variant={difficultyStyle}
                          colorScheme="green"
                          color={difficultyStyle === "filled" ? "green" : ""}
                          onChange={(e) => {
                            setDifficulty(e.target.value);
                            setDifficultyStyle("filled");
                          }}
                        >
                          <option className="option" value="easy">
                            Easy
                          </option>
                          <option className="option" value="medium">
                            Medium
                          </option>
                          <option className="option" value="hard">
                            Hard
                          </option>
                          <option selected className="option" value="All">
                            All
                          </option>
                        </Select>
                      </div>
                    </div>
                  </div>
                  {/* <h6 className="pb-3">Select a Language</h6> */}
                  {/* {languages.map((language) => {
                  return (
                    <div className="col-3">
                      <div
                        className={
                          selected +
                          " language-card shadow-lg rounded py-3 px-4 me-2 mb-3"
                        }
                        key={language}
                      >
                        <div className="card-header">
                          <h5 className="card-title pb-4">{language}</h5>
                        </div>
                        <Button
                          colorScheme="green"
                          onClick={() => {
                            setLanguage(language);
                            colorScheme = "ouline";
                          }}
                        >
                          Start
                        </Button>
                      </div>
                    </div>
                  );
                })} */}
                </div>
              </div>
              <Divider />
              <div className="questions-container container pt-0 px-0 pb-3 m-0">
                <div className="row d-flex justify-content-start">
                  <h6 className="pb-3">
                    {language.substring(0, 1).toUpperCase() +
                      language.substring(1)}{" "}
                    Questions
                  </h6>
                  {questions.map((question) => {
                    return <QuestionCard question={question} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
