import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import {
  styled,
  createTheme,
  ThemeProvider,
  duration,
} from "@mui/material/styles";
import Divider from "@mui/material/Divider";

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
  const [model, setModel] = useState(null);
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate("/bankInfo");
  };

  return (
    <ThemeProvider theme={buttonTheme}>
      <Box sx={styles.column}>
        <Typography sx={styles.title}>Bank Fraud Prediction</Typography>
        <Box sx={styles.row}>
          <Box sx={styles.column}>
            <Button variant="contained" color="primary" sx={styles.btn}>
              Basic Info
            </Button>
            <Button variant="contained" color="primary" sx={styles.btn}>
              Bank Info
            </Button>
            <Button variant="contained" color="primary" sx={styles.btn}>
              Test Result
            </Button>
          </Box>
          <Divider orientation="vertical" color="#9146D8" flexItem />
          <Box sx={styles.inputArea}>
            <FormRow>
              <Select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                sx={{ fontSize: 36 }}
                fullWidth
                displayEmpty
              >
                <MenuItem value="" disabled sx={{ fontSize: 36 }}>
                  Model
                </MenuItem>
                <MenuItem value="LR" sx={{ fontSize: 36 }}>
                  LR
                </MenuItem>
                <MenuItem value="Tree" sx={{ fontSize: 36 }}>
                  Tree
                </MenuItem>
                <MenuItem value="SVM" sx={{ fontSize: 36 }}>
                  SVM
                </MenuItem>
                <MenuItem value="DL" sx={{ fontSize: 36 }}>
                  DL
                </MenuItem>
              </Select>
              <Button variant="contained" color="primary" sx={styles.btnNext}>
                Predict
              </Button>
            </FormRow>

            <Box sx={styles.row}>
              <Button
                variant="contained"
                color="primary"
                sx={styles.btnNext}
                onClick={handleBackClick}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" sx={styles.btnNext}>
                Finish
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const styles = {
  column: {
    display: "flex",
    flexDirection: "column",
  },
  btn: {
    height: "10vw",
    width: "20vw",
    fontSize: "calc(1.5em + 0.5vw)",
    margin: "2vh",
  },
  btnNext: {
    height: "5vh",
    width: "10vw",
    fontSize: "calc(1em + 0.5vw)",
    margin: "1vh",
    display: "flex",
    justifyContent: "center",
    alignItem: "center",
  },
  title: {
    fontSize: "calc(3em + 0.5vw)",
    fontWeight: "bold",
    color: "#9146D8",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: "4vh",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    gap: "1vw",
    justifyContent: "center",
    alignItem: "center",
  },
  inputArea: {
    width: "80%",
    margin: "1%",
  },
};

export default TestResult;
