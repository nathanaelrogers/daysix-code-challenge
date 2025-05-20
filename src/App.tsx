import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import { List } from "./screens/list/list";
import { Input } from "./screens/input/input";
import { Test } from "./screens/test/test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/input" element={<Input />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
