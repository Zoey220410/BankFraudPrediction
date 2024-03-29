import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BasicInfo from "./pages/BasicInfo";
import BankInfo from "./pages/BankInfo";
import TestResult from "./pages/TestResult";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BasicInfo />} />
        <Route path="/bankInfo" element={<BankInfo />} />
        <Route path="/testResult" element={<TestResult />} />
      </Routes>
    </Router>
  );
}

export default App;
