import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { List } from "./screens/list/list";
import { Input } from "./screens/input/input";
import { Test } from "./screens/test/test";
import { useState, useEffect } from "react";
import { ConfigSettings } from "./config-settings";

export type TestResult = {
  score: number;
  timestamp: number;
  rating: string;
};

export type UserSettings = {
  name: string;
  gender: string;
};

function App() {
  const storedResults = localStorage.getItem("testResults");
  const [results, setResults] = useState<TestResult[]>(
    storedResults ? JSON.parse(storedResults) : []
  );

  const storedSettings = localStorage.getItem("userSettings");
  const [userSettings, setUserSettings] = useState<UserSettings | null>(
    storedSettings ? JSON.parse(storedSettings) : null
  );

  const storedFreshResult = localStorage.getItem("freshResult");
  const [freshResult, setFreshResult] = useState<boolean>(
    storedFreshResult ? JSON.parse(storedFreshResult) : false
  );

  const [currentResult, setCurrentResult] = useState<TestResult | null>(null);

  useEffect(() => {
    if (userSettings) {
      localStorage.setItem("userSettings", JSON.stringify(userSettings));
    }
  }, [userSettings]);

  useEffect(() => {
    localStorage.setItem("testResults", JSON.stringify(results));
  }, [results]);

  const handleSubmitTest = (newResult: TestResult) => {
    setFreshResult(false);
    setCurrentResult(null);
    setResults([...results, newResult]);
  };

  const handleRetryTest = () => {
    setFreshResult(false);
    setCurrentResult(null);
  };

  const handleTestEnd = (newResult: TestResult) => {
    setFreshResult(true);
    setCurrentResult(newResult);
  };

  if (!userSettings) return <ConfigSettings onSubmit={setUserSettings} />;

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <List
                settings={userSettings}
                results={results}
                onDisplayDetails={setCurrentResult}
              />
            }
          />
          <Route
            path="/input"
            element={
              <Input onTestEnd={handleTestEnd} settings={userSettings} />
            }
          />
          <Route
            path="/test"
            element={
              <Test
                result={currentResult}
                userSettings={userSettings}
                freshResult={freshResult}
                onRetryTest={handleRetryTest}
                onSubmitResults={handleSubmitTest}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
