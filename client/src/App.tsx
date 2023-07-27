import { useState, useRef } from "react";
import "./App.css";

interface ApiResponse {
  streakLength: number;
  streakStart: number;
  streakEnd: number;
}

function App() {
  const [inputText, setInputText] = useState<string>("");
  const [response, setResponse] = useState<ApiResponse | null>(null);

  async function checkString(text: string) {
    try {
      const res = await fetch(
        `http://localhost:3001/check-string?string=${text}`
      );
      const data: ApiResponse = await res.json();
      console.log(data);
      setResponse(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="app-container">
      <input
        onChange={(e) => {
          checkString(e.target.value);
          setInputText(e.target.value);
        }}
        type="text"
        autoFocus={true}
        value={inputText}
      />
      <div contentEditable>{}</div>
      <h4>
        Longest even or odd streak: {response ? response.streakLength : 0}
      </h4>
      <h4 className="highlight-container">
        {inputText.length > 0 &&
          response &&
          inputText.split("").map((char, index) => {
            if (
              index >= response.streakStart &&
              index <= response.streakEnd &&
              response.streakStart !== null
            ) {
              return (
                <span key={index} className="highlight">
                  {char}
                </span>
              );
            }
          })}
      </h4>
    </div>
  );
}

export default App;
