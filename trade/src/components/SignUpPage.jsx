import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import FlexBetween from "./FlexBetween";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { styled } from "@mui/system";

const SignUpBox = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "99%",
  maxWidth: "400px",
  margin: "0 auto",
  marginTop: "50px",
});

const Header = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "0 auto",
  marginTop: "50px",
});

const SignUpForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
});

const SignUp = () => {
  const navigate = useNavigate();

  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [signupMessage, setSignupMessage] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleOccupationChange = (event) => {
    setOccupation(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5001/users/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        city,
        state,
        country,
        occupation,
        phoneNumber,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSignUpSuccess(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (signUpSuccess) {
      setSignupMessage("Sign up success! Redirecting to Log in page");
      const timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [signUpSuccess, navigate]);

  const handleLogIn = async (event) => {
    event.preventDefault();
    const response = navigate("/login");
  };

  return (
    <Box>
      <Header>
        <FlexBetween>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            WELCOME TO TRADE TRACK
          </Typography>
        </FlexBetween>
      </Header>
      <SignUpBox>
        <Typography variant="h4">Sign Up</Typography>
        <SignUpForm onSubmit={handleSubmit}>
          <TextField
            id="name"
            label="Name"
            type="text"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={handleNameChange}
            required
            sx={{ width: "100%" }}
          />
          <TextField
            id="email"
            label="E-mail"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={handleEmailChange}
            required
            sx={{ width: "99%" }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
            required
            sx={{ width: "99%" }}
          />
          <TextField
            id="city"
            label="City"
            type="text"
            variant="outlined"
            margin="normal"
            value={city}
            onChange={handleCityChange}
            required
            sx={{ width: "99%" }}
          />
          <TextField
            id="state"
            label="State"
            type="text"
            variant="outlined"
            margin="normal"
            value={state}
            onChange={handleStateChange}
            sx={{ width: "99%" }}
            required
          />
          <TextField
            id="country"
            label="Country"
            type="text"
            variant="outlined"
            margin="normal"
            value={country}
            onChange={handleCountryChange}
            sx={{ width: "99%" }}
            required
          />
          <TextField
            id="occupation"
            label="Occupation"
            type="occupation"
            variant="outlined"
            margin="normal"
            value={occupation}
            onChange={handleOccupationChange}
            sx={{ width: "99%" }}
          />
          <TextField
            id="phoneNumber"
            label="Phone Number"
            type="text"
            variant="outlined"
            margin="normal"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            sx={{ width: "99%" }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, width: "50%" }}
          >
            Sign Up
          </Button>
          {signupMessage && (
            <Typography color="error">{signupMessage}</Typography>
          )}
          <SignUpBox>
            <Typography variant="h6">
              Already have an account? Log in here:
            </Typography>
            <Button
              onClick={handleLogIn}
              variant="contained"
              sx={{ mt: 2, width: "50%" }}
            >
              Log In
            </Button>
          </SignUpBox>
        </SignUpForm>
      </SignUpBox>
    </Box>
  );
};

export default SignUp;
