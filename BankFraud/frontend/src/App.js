import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BasicInfo from "./pages/BasicInfo";
import TestResult from "./pages/TestResult";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BasicInfo />} />
        <Route path="/testResult" element={<TestResult />} />
      </Routes>
    </Router>
  );
}

export default App;
