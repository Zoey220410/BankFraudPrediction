import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Select, MenuItem, Divider, styled, createTheme, ThemeProvider } from "@mui/material";
import axios from "axios";

const buttonTheme = createTheme({
  palette: {
    primary: {
      main: "#9146D8",
    },
    secondary: {
      main: "#D9D9D9",
    },
  },
});

const FormRow = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  gap: "2vw",
});

const TestResult = () => {
  const [model, setModel] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/");
  };

  const handleResult = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/predict?model=${model}`);
      setResult(response.data.prediction);
      console.log("Prediction:", response.data.prediction);
    } catch (error) {
      console.error("Prediction Error:", error);
      setResult("Error fetching prediction");
    }
  };

  return (
    <ThemeProvider theme={buttonTheme}>
      <Box sx={{ height: "100vh", display: "flex", justifyContent: "center" }}>
        <Box sx={{ width: "80%", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography variant="h2" sx={{ color: "#9146D8", marginBottom: 4 }}>Bank Fraud Prediction</Typography>
          <Select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ marginBottom: 2 }}
          >
            <MenuItem value="" disabled>Select Model</MenuItem>
            <MenuItem value="Logistic Regression">Logistic Regression</MenuItem>
            <MenuItem value="Random Forest">Random Forest</MenuItem>
            <MenuItem value="LightGBM">LightGBM</MenuItem>
            <MenuItem value="XGBoost">XGBoost</MenuItem>
          </Select>
          <Button variant="contained" onClick={handleResult} sx={{ width: "200px", marginBottom: 2 }}>Predict</Button>
          <Typography variant="h5" sx={{ color: "#9146D8", marginTop: 2 }}>
            {result ? `Prediction Result: ${result}` : "No prediction yet"}
          </Typography>
          <Button variant="contained" onClick={handleBackClick} sx={{ width: "200px", marginTop: 2 }}>Back</Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default TestResult;
