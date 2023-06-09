// React
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// Components
import Question from "../components/Question";
import "../css/coding-page.css";
import Login from "../components/Login";
import NavBar from "../components/NavBar";
import languages from "../data/languages.json";
// ACE Editor
import ace from "ace-builds/src-noconflict/ace";
import jsonWorkerUrl from "ace-builds/src-noconflict/worker-javascript?url";
ace.config.setModuleUrl("ace/mode/javascript_worker", jsonWorkerUrl);
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-markdown";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import AceEditor from "react-ace";
// AXIOS
import axios from "axios";
// BASE64 ENCODING
import { encode, decode } from "js-base64";
// Chakra-UI
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
  CloseButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";

export default () => {
  const navigate = useNavigate();

  const { language, qid, question } = useParams();
  const languageOptions = languages[language];
  const [languageId, setLanguageId] = useState(languageOptions[0].id);
  const data = JSON.parse(localStorage.getItem("data"))["questions"];
  const codeQuestion = data.find((question) => {
    if (question.qid === qid) {
      return question;
    }
  });

  // Login Status
  const loginStatus = localStorage.getItem("loginStatus");

  // Chakra-UI Modal variables for the code editor
  let { isOpen, onOpen, onClose } = useDisclosure();
  if (loginStatus === "false") {
    isOpen = true;
    onClose = () => {
      window.location.href = "/";
    };
  } else {
    isOpen = false;
  }

  const [theme, setTheme] = useState("monokai");
  const [key, setKey] = useState("input");
  const [code, setCode] = useState("");
  const [tabIndex, setTabIndex] = useState(0);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [outputChecking, setOutputChecking] = useState("");
  const [outputState, setOutputState] = useState("Not Running");

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  const compileAndRun = (action, language_id, code, input, expected_output) => {
    // Function to get the submission result using the token
    // 2. This function is called after the first function is executed and the token is received.

    let output = "";
    let execTime = "";
    let errMessage = "";
    let exp_out = "";
    const getSubmission = async (token) => {
      const options = {
        method: "GET",
        url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
        params: { base64_encoded: "true", fields: "*" },
        headers: {
          "X-RapidAPI-Key":
            "dc68c55af9msh1907b09b2b88447p142064jsn5fde1ff26cd1",
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
      };

      // 1. Sending the request to the judge0 api to get the submission result using the token.
      axios.request(options).then(function (response) {
        if (action === "submit") {
          setKey("testcases");
        } else {
          setKey("output");
          setOutputState("Not Running");
        }
        const data = response.data;
        try {
          let code = data["source_code"];
          let stdout = data["stdout"];
          exp_out = expected_output;
          execTime = data["time"];
          let stderr = data["stderr"];
          let message = data["message"];

          console.log("stdout", decode(stdout) || "No Output");
          console.log("output", codeQuestion.sampleOutput.join(""));
          console.log(
            decode(stdout).split("\n").join("") ===
              codeQuestion.sampleOutput.join("")
          );

          if (stderr === null) {
            stderr = "No Error";
          } else {
            stderr = decode(stderr);
            errMessage = stderr;
          }
          if (message === null) {
            message = "No Error";
          } else {
            message = decode(message);
          }
          console.log("Message:", message);
          if (stdout === null) {
            if (stderr === "No Error") {
              if (action != "submit") {
                setOutput("No Output");
              }
            } else {
              if (action != "submit") {
                setOutput(stderr);
              }
            }
          } else {
            stdout = decode(stdout) || "";
            if (action != "submit") {
              setOutput(stdout);
            }
            output = stdout;
          }
          if (exp_out === null) {
            exp_out = "No Output";
          } else {
            exp_out = exp_out;
          }
          code = decode(code);

          // console.log("CODE:\n", code);
          // console.log("EXPECTED OUTPUT", expected_output);
          // console.log("OUTPUT: ", stdout);
          // console.log("TIME: ", execTime);
          // console.log("ERROR: ", stderr);
        } catch (error) {
          console.log(error || "");
        }
        console.log("output", outputChecking);
      });
    };

    // Function to send the code to the judge0 api
    let sampleOutput = encode(expected_output);

    const data = JSON.stringify({
      language_id: language_id,
      source_code: encode(code),
      stdin: encode(input),
      expected_output: encode(sampleOutput.split("\n").join(" ")),
    });

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "dc68c55af9msh1907b09b2b88447p142064jsn5fde1ff26cd1",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: data,
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        setOutput("Running");
        setOutputState("Running");
        getSubmission(token);
      })
      .catch(function (error) {
        console.error(error);
        console.log(error.response.data);
      });
  };

  // code to change output when output changes in the output tab of the editor
  useEffect(() => {
    setOutput(output);
  }, [output]);

  return (
    <div className="code-container green-text">
      {/* Modal */}
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        isCentered
      >
        <ModalOverlay />
        <ModalContent className="py-4 m-0">
          <Login route={`codingpage/${language}/${qid}/${question}`} />
          <Button
            className="mx-4 bg-dark mt-3"
            variant="filled"
            colorScheme="black"
            onClick={() => {
              navigate("/practice");
            }}
          >
            Back
          </Button>
        </ModalContent>
      </Modal>
      <div className="row">
        <div className="col-5 question-container green-text pb-5">
          <Question data={codeQuestion} />
        </div>
        <div className="col-7 code-playground pb-3">
          <div className="editor-options d-flex align-items-center justify-content-end py-2">
            <label htmlFor="language">
              Language:
              <select
                name="language"
                id="language"
                className="language select mx-2 p-1"
                onChange={(e) => {
                  // alert(e.target.value);
                  setLanguageId(e.target.value);
                }}
              >
                {/* <option value={language}>{language}</option> */}
                {languageOptions.map((language) => {
                  return (
                    <option
                      className="option"
                      value={language.id}
                      key={language.id}
                    >
                      {language.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <label htmlFor="theme" className="ms-2">
              Theme:
              <select
                name="theme"
                id="theme"
                onChange={(e) => {
                  setTheme(e.target.value);
                  console.log(e.target.value);
                }}
                className="theme select mx-2 p-1"
              >
                <option className="option" value="monokai">
                  Dark
                </option>
                <option className="option" value="github">
                  Light
                </option>
              </select>
            </label>
            <Button
              variant="outline"
              className="green-btn-outline"
              size="sm"
              onClick={() => {
                setCode("");
              }}
            >
              Reset Code
            </Button>
          </div>
          <AceEditor
            placeholder="Write your code here"
            mode={languageOptions[0].aceMode}
            theme={theme}
            name="blah2"
            onLoad={() => {}}
            onChange={(e) => {
              setCode(e);
            }}
            className="code-editor rounded text-white"
            id="code-editor"
            fontFamily="Times New Roman"
            fontSize={18}
            showPrintMargin={false}
            showGutter={true}
            highlightActiveLine={true}
            value={code}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: false,
              showLineNumbers: true,
              tabSize: 4,
            }}
          />
          <div className="btn-container d-flex pt-4">
            {/* <div className="testcase-result d-flex flex-column">
                <p className="m-0">Sample Output: {codeQuestion.sampleOutput}</p>
                <br />
                <p className="m-0">Actual Output: {output}</p>
                <br />
                <p className="m-0">Passed: {codeQuestion.sampleOutput == output}</p>
              </div> */}
            <Button
              size="lg"
              className="green-btn ms-auto"
              {...(outputState == "Running" ? { isLoading: true } : "")}
              {...(outputState == "Running" ? { loadingText: "Running" } : "")}
              onClick={() => {
                compileAndRun("Running", languageId, code, input, language);
                setOutputState("Running");
                handleTabsChange(1);
              }}
            >
              Run
            </Button>
          </div>
          <div className="output-console mt-3 mb-5">
            <Tabs index={tabIndex} variant="soft-rounded" colorScheme="green">
              <TabList>
                <Tab
                  onClick={() => {
                    handleTabsChange(0);
                  }}
                >
                  Input
                </Tab>
                <Tab
                  onClick={() => {
                    handleTabsChange(1);
                  }}
                >
                  Output
                </Tab>
                {/* <Tab
                    onClick={() => {
                      handleTabsChange(2);
                    }}
                  >
                    Testcases
                  </Tab> */}
              </TabList>
              <TabPanels>
                <TabPanel className="px-0">
                  <AceEditor
                    mode="markdown"
                    theme={theme}
                    name="input-console"
                    id="input-console"
                    onLoad={() => {}}
                    onChange={(e) => {
                      setInput(e);
                    }}
                    value={input}
                    fontSize={18}
                    showPrintMargin={false}
                    showGutter={false}
                    placeholder="Input will be displayed here"
                  />
                </TabPanel>
                <TabPanel className="px-0">
                  <AceEditor
                    mode="markdown"
                    theme={theme}
                    name="output-console"
                    id="output-console"
                    value={output}
                    fontSize={18}
                    showPrintMargin={false}
                    placeholder="Output will be displayed here"
                  />
                </TabPanel>
                {/* <TabPanel className="px-0">
                    <div className="test-cases">
                      <Tabs variant="soft-rounded" className="d-flex">
                        <TabList className="testcase-list d-flex flex-column pt-4">
                          <Tab
                            bg="red.200"
                            color={"white"}
                            _selected={{ color: "white", bg: "red.500" }}
                            className="testcase-tab"
                          >
                            Testcase 1
                          </Tab>
                          <Tab
                            bg={"green.200"}
                            color={"white"}
                            _selected={{
                              color: "white",
                              bg: "green.500",
                            }}
                            className="testcase-tab"
                          >
                            Testcase 2
                          </Tab>
                          <Tab className="testcase-tab">Testcase 3</Tab>
                        </TabList>
                        <TabPanels>
                          <TabPanel>
                            <div className="testcase-details">
                              <div className="testcase-input">
                                <h5 className="testcase-heading">Input</h5>
                                <p>Input is Shown Here</p>
                              </div>
                              <div className="testcase-output">
                                <h5 className="testcase-heading">Output</h5>
                                <p>Output is Shown Here</p>
                              </div>
                              <div className="testcase-expected-output">
                                <h5 className="testcase-heading">
                                  Expected Output
                                </h5>
                                <p>Expected Output is Shown Here</p>
                              </div>
                              <div className="compiler-message">
                                <h5 className="testcase-heading">
                                  Compiler Message
                                </h5>
                                <p>Compiler Message is Shown Here</p>
                              </div>
                            </div>
                          </TabPanel>
                          <TabPanel>TestCase2</TabPanel>
                          <TabPanel>TestCase3</TabPanel>
                        </TabPanels>
                      </Tabs>
                    </div>
                  </TabPanel> */}
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
