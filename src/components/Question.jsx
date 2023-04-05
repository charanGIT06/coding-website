const Question = ({ data }) => {
  let sampleOutputLines = 0;
  return (
    <div className="question p-4">
      <h2 className="question-name">{data.questionTitle}</h2>

      <div className="descrition-section">
        <h5 className="mt-4">Description</h5>
        <pre className="problem-statement">{data.description}</pre>
      </div>
      <div className="input-format-section">
        <h5 className="mt-4">Input Format</h5>
        <pre className="input-format">{data.inputFormat}</pre>
      </div>
      <div className="output-format-section">
        <h5 className="mt-4">Output Format</h5>
        <pre className="output-format">{data.outputFormat}</pre>
      </div>
      <div className="constraints-section">
        <h5 className="mt-4">Constraints</h5>
        <pre className="constraints">{data.constraints}</pre>
      </div>
      <div className="sample-input-section">
        {
          <div className="sample">
            <div className="sample-input">
              <h5 className="mt-4">Sample Input</h5>
              <p className="sample-input-0 bg-dark text-white p-3 mt-3 rounded">
                {data.sampleInput}
              </p>
            </div>
            <div className="sample-output">
              <h5 className="mt-4">Sample Output</h5>
              <pre className="sample-output-0 bg-dark text-white p-3 mt-3 rounded">
                {(typeof data.sampleOutput === "object") ? (data.sampleOutput).map((output) => {
                  return <p className="mb-1" key={sampleOutputLines++} >{output}</p>;
                }) : data.sampleOutput}
              </pre>
            </div>
            <div className="explanation">
              <h5 className="mt-4">Explanation</h5>
              <p className="explanation-0 bg-dark text-white p-3 mt-3 rounded">
                {data.explanation}
              </p>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Question;
