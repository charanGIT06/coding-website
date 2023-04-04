// React
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// Components
import Question from "../components/Question";
import "../css/code-editor.css";
// ACE Editor
import ace from "ace-builds/src-noconflict/ace";
import jsonWorkerUrl from "ace-builds/src-noconflict/worker-javascript?url";
ace.config.setModuleUrl("ace/mode/javascript_worker", jsonWorkerUrl);
import "ace-builds/src-noconflict/mode-python";
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
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

export default () => {
  const { language, qid, question } = useParams();
  const data = JSON.parse(localStorage.getItem("data"))[
    `${language}-questions`
  ];
  const codeQuestion = data.find((question) => {
    if (question.qid === qid) {
      return question;
    }
  });

  const [theme, setTheme] = useState("monokai");
  const [key, setKey] = useState("input");
  const [code, setCode] = useState(
    "# Write your code here\nprint('Hello World')"
  );
  const [tabIndex, setTabIndex] = useState(0);
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  const compileAndRun = (language_id, code, input, expected_output) => {
    // Function to get the submission result using the token
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

      axios
        .request(options)
        .then(function (response) {
          setKey("output");
          const data = response.data;
          console.log(data);
          console.log(typeof data);
          try {
            let code = data["source_code"];
            let stdout = data["stdout"];
            let time = data["time"];
            let stderr = data["stderr"];
            let message = data["message"];

            if (stderr === null) {
              stderr = "No Error";
            } else {
              stderr = decode(stderr);
            }
            if (message === null) {
              message = "No Error";
            } else {
              message = decode(message);
            }
            console.log("Message:", message);
            if (stdout === null) {
              if (stderr === "No Error") {
                setOutput("No Output");
              } else {
                setOutput(stderr);
              }
            } else {
              stdout = decode(stdout);
              setOutput(stdout);
            }
            code = decode(code);

            console.log("CODE:\n", code);
            console.log("OUTPUT: ", stdout);
            console.log("TIME: ", time);
            console.log("ERROR: ", stderr);
          } catch (error) {
            console.log(error);
          }
          //   const code = decode(data['source_code']);
          //   const stdout = decode(data['stdout']);
          //   console.log("CODE:\n", code);
          //   console.log("OUTPUT: ", stdout);
        })
        .catch(function (error) {
          setOutput(error);
          console.error(error);
        });
    };

    console.log(input);
    // Function to send the code to the judge0 api
    const data = JSON.stringify({
      language_id: language_id,
      source_code: encode(code),
      stdin: encode(input),
      expected_output: encode(codeQuestion.sampleOutput),
    });

    const options = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": "10c7a4ffafmsh381152dcf6b7e23p15bf4fjsn3b28ba6f62f2",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      data: data,
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        setOutput("Running");
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

  const loadingAttribute = 1;

  return (
    <div className="code-container">
      <div className="row">
        <div className="col-5 question-container">
          <Question data={codeQuestion} />
        </div>
        <div className="col-7 code-playground">
          <div className="editor-options d-flex align-items-center justify-content-end py-2">
            <label htmlFor="language">
              Language:
              <select
                name="language"
                id="language"
                className="language mx-2 p-1"
              >
                <option value="Python">Python</option>
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
                onBlur={(e) => {
                  setTheme(e.target.value);
                }}
                className="theme mx-2 p-1"
              >
                <option value="monokai">Dark</option>
                <option value="github">Light</option>
              </select>
            </label>
            <button
              className="btn btn-primary ms-2 my-0 py-1 px-3 reset"
              onClick={() => {
                setCode("# Write your code here\nprint('Hello World')");
                setOutput("Output will be displayed here");
              }}
            >
              Reset
            </button>
          </div>
          <AceEditor
            placeholder="Write your code here"
            mode="python"
            theme={theme}
            name="blah2"
            onLoad={() => {
              console.log("Console Loaded");
            }}
            onChange={(e) => {
              setCode(e);
            }}
            className="code-editor rounded"
            id="code-editor"
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
          <div className="btn-container d-flex justify-content-end pt-4 pe-3">
            {/* <button className="btn btn-secondary compile me-2">Compile</button>
            <button
              className="run btn btn-primary"
              onClick={() => {
                compileAndRun("71", code, input, language);
              }}
            >
              Run
            </button> */}
            <Button
              size="lg"
              variant="outline"
              colorScheme="gray"
              className="me-2"
              onClick={() => {
                compileAndRun("71", code, input, language);
                handleTabsChange(1);
              }}
            >
              Run
            </Button>
            <Button
              size="lg"
              variant="solid"
              colorScheme="green"
              onClick={() => {
                handleTabsChange(2);
              }}
            >
              Submit
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
                <Tab
                  onClick={() => {
                    handleTabsChange(2);
                  }}
                >
                  Testcases
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel className="px-0">
                  <AceEditor
                    mode="markdown"
                    theme={theme}
                    name="input-console"
                    id="input-console"
                    onLoad={() => {
                      console.log("Input Loaded");
                    }}
                    onChange={(e) => {
                      setInput(e);
                    }}
                    value={input}
                    fontSize={18}
                    showPrintMargin={false}
                    showGutter={false}
                    placeholder="Input goes here"
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
                <TabPanel className="px-0">
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
                          _selected={{ color: "white", bg: "green.500" }}
                          className="testcase-tab"
                        >
                          Testcase 2
                        </Tab>
                        <Tab className="testcase-tab">Testcase 3</Tab>
                      </TabList>
                      <TabPanels>
                        <TabPanel>
                          <div className="testcase">
                            <div className="input">
                              <p className="mb-2">Input</p>
                              <p className="bg-dark text-white rounded p-3">
                                Input goes here
                              </p>
                            </div>
                            <div className="output">
                              <p className="mb-2">Output</p>
                              <p className="bg-dark text-white rounded p-3">
                                Output goes here
                              </p>
                            </div>
                            <div className="expected-output">
                              <p className="mb-2">Expected Output</p>
                              <p className="bg-dark text-white rounded p-3">
                                Expected Output goes here
                              </p>
                            </div>
                            <div className="console-message">
                              <p className="mb-2">Error</p>
                              <p className="bg-dark text-white rounded p-3">
                                Console Error goes here
                              </p>
                            </div>
                          </div>
                        </TabPanel>
                        <TabPanel>TestCase2</TabPanel>
                        <TabPanel>TestCase3</TabPanel>
                      </TabPanels>
                    </Tabs>
                  </div>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
