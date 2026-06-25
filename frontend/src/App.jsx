import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a PDF first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/upload",
        formData
      );

      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    }
  };

  const askQuestion = async () => {
    if (question.trim() === "") {
      alert("Please enter a question.");
      return;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          question: question,
        }
      );

      setAnswer(response.data.answer);
    } catch (error) {
      console.error(error);
      alert("Failed to get answer.");
    }
  };

  return (
    <div className="container" style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h1>AI Document Intelligence Platform</h1>

      <hr />

      <h2>Upload PDF</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br />
      <br />

      <button onClick={uploadFile}>
        Upload PDF
      </button>

      <br />
      <br />

      {file && (
        <p>
          <strong>Selected File:</strong> {file.name}
        </p>
      )}

      <hr />

      <h2>Ask Questions</h2>

      <input
        type="text"
        placeholder="Ask something about the uploaded document..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          fontSize: "16px",
        }}
      />

      <br />
      <br />

      <button onClick={askQuestion}>
        Ask
      </button>

      <br />
      <br />

      {answer && (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            borderRadius: "8px",
            backgroundColor: "#f8f8f8",
          }}
        >
          <h3>Answer</h3>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;