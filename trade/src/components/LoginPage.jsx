import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import FlexBetween from "./FlexBetween";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const LoginBox = styled(Box)({
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

const LoginForm = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "99%",
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5001/users")
      .then((response) => response.json())
      .then((data) => {
        const user = data.data.find((user) => user.email === email);
        if (user && user.password === password) {
          localStorage.setItem("userId", user._id);
          localStorage.setItem("userName", user.name);
          navigate("/dashboard");
        } else {
          setErrorMessage("Invalid email or password");
        }
      });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const response = navigate("/signup");
  };

  return (
    <Box>
      <Header>
        <FlexBetween>
          <TrendingUpIcon sx={{ fontSize: { xs: 120, md: 200 } }} />
        </FlexBetween>
      </Header>
      <Header>
        <FlexBetween>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            WELCOME TO TRADE TRACK
          </Typography>
        </FlexBetween>
      </Header>
      <LoginBox>
        <Typography variant="h4">Log In</Typography>
        <LoginForm onSubmit={handleSubmit}>
          <TextField
            id="email"
            label="E-mail"
            type="email"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={handleEmailChange}
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
            sx={{ width: "99%" }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, width: "50%" }}
          >
            Log in
          </Button>
          {errorMessage && (
            <Typography color="error">{errorMessage}</Typography>
          )}
          <LoginBox>
            <Typography variant="h6">
              Don't have an account? Sign up here
            </Typography>
            <Button
              onClick={handleSignUp}
              variant="contained"
              sx={{ mt: 2, width: "50%" }}
            >
              Sign Up
            </Button>
          </LoginBox>
        </LoginForm>
      </LoginBox>
    </Box>
  );
};

export default Login;
