import { useState } from "react";
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
      <h4>
        Longest even or odd streak: {response ? response.streakLength : 0}
      </h4>
    </div>
  );
}

export default App;
