import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
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

const BasicInfo = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [device, setDevice] = useState("");
  const [housing, setHousing] = useState("");
  const [creditScore, setCreditScore] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const navigate = useNavigate();
  const devices = ["Windows", "Linux", "Other"];
  const housing_status = ["BA", "BB", "BC", "BD", "BE", "BF", "BG"];

  const handleClick = async () => {
    if (
      firstName.trim() === "" ||
      lastName.trim() === "" ||
      email.trim() === "" ||
      device.trim() === "" ||
      housing.trim() === "" ||
      creditScore.trim() === "" ||
      requestDate.trim() === ""
    ) {
      navigate("/testResult");
      return;
      // alert("Please input all the info.");
    }

    const currentDate = new Date();
    const inputDate = new Date(requestDate);

    const timeDiff = Math.abs(inputDate.getTime() - currentDate.getTime());

    const diffDays = Math.ceil(timeDiff / (1000 * 3200 * 24));

    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      housing_status: housing,
      device_os: device,
      credit_risk_score: creditScore,
      days_since_request: diffDays,
    };

    console.log(data);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload-data",
        data
      );
      console.log("Data posting successfully:", response);

      navigate("/testResult");
    } catch (error) {
      console.error("Data posting Error:", error);
    }
  };

  return (
    <ThemeProvider theme={buttonTheme}>
      <Box sx={{ ...styles.row, height: "100vh" }}>
        <Box sx={styles.column}>
          <Button
            variant="contained"
            color="primary"
            sx={styles.btn}
            onClick={handleClick}
          >
            User Info
          </Button>
          <Button variant="contained" color="secondary" sx={styles.btn}>
            Test Result
          </Button>
        </Box>
        <Divider orientation="vertical" color="#9146D8" flexItem />
        <Box sx={styles.inputArea}>
          <Typography sx={styles.title}>Bank Fraud Prediction</Typography>
          <FormRow>
            <TextField
              label="First Name"
              value={firstName}
              inputProps={{ style: { fontSize: 32 } }}
              InputLabelProps={{ style: { fontSize: 32 } }}
              margin="normal"
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Last Name"
              value={lastName}
              inputProps={{ style: { fontSize: 32 } }}
              InputLabelProps={{ style: { fontSize: 32 } }}
              margin="normal"
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              required
            />
          </FormRow>
          <FormRow>
            <TextField
              label="Email"
              value={email}
              inputProps={{ style: { fontSize: 32 } }}
              InputLabelProps={{ style: { fontSize: 32 } }}
              margin="normal"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
            />
            <TextField
              id="outlined-select-device-native"
              select
              label="Device_OS"
              value={device}
              inputProps={{ style: { fontSize: 32 } }}
              InputLabelProps={{ style: { fontSize: 32 } }}
              margin="normal"
              onChange={(e) => setDevice(e.target.value)}
              SelectProps={{
                native: true,
              }}
              fullWidth
              required
              helperText="Please select your device OS"
            >
              <option aria-label="None" value="" />
              {devices.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
          </FormRow>
          <FormRow>
            <TextField
              id="outlined-select-device-native"
              select
              label="Housing Status"
              value={housing}
              inputProps={{ style: { fontSize: 32 } }}
              InputLabelProps={{ style: { fontSize: 32 } }}
              margin="normal"
              onChange={(e) => setHousing(e.target.value)}
              SelectProps={{
                native: true,
              }}
              fullWidth
              required
              helperText="Please select your housing status"
            >
              <option aria-label="None" value="" />
              {housing_status.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
            <TextField
              label="Credit Risk Score"
              value={creditScore}
              inputProps={{ style: { fontSize: 32 } }}
              InputLabelProps={{ style: { fontSize: 32 } }}
              margin="normal"
              onChange={(e) => setCreditScore(e.target.value)}
              fullWidth
              required
            />
          </FormRow>
          <FormRow>
            <TextField
              label="Request Date"
              value={requestDate}
              type="date"
              inputProps={{ style: { fontSize: 32 } }}
              InputLabelProps={{
                style: { fontSize: 32 },
                shrink: true,
              }}
              margin="normal"
              onChange={(e) => {
                setRequestDate(e.target.value);
              }}
              fullWidth
              required
            />
          </FormRow>
          <Box sx={styles.row}>
            <Button
              variant="contained"
              color="primary"
              sx={styles.btnNext}
              onClick={handleClick}
            >
              Next
            </Button>
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
    justifyContent: "center",
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
    margin: "3%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
};

export default BasicInfo;
