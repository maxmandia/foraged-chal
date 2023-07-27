import { useState } from "react";
import "./App.css";

interface ApiResponse {
  streakLength: number;
  streakStart: number | null;
  streakEnd: number | null;
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
      <h4>Longest even or odd streak: {response?.streakLength ?? 0}</h4>
      <h4 className="highlight-container">
        {inputText.length > 0 &&
          response &&
          inputText.split("").map((char, index) => {
            // If the response is null, it's non alphabetical. We won't display anything.
            if (response.streakStart === null || response.streakEnd === null) {
              return;
            }
            // Making sure the index of the current char is within the streak range.
            if (
              response &&
              index >= response.streakStart &&
              index <= response.streakEnd
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
