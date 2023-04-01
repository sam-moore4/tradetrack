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

const NewInvestment = () => {
  const navigate = useNavigate();

  const [newInvestmentSuccess, setNewInvestmentSuccess] = useState(false);

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [type, setType] = useState("");
  const [stockex, setStockEx] = useState("");
  const [lastsale, setLastSale] = useState("");
  const [country, setCountry] = useState("");
  const [sector, setSector] = useState("");
  const [industry, setIndustry] = useState("");
  const [investmentMessage, setInvestmentMessage] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleStockExChange = (event) => {
    setStockEx(event.target.value);
  };

  const handleLastSaleChange = (event) => {
    setLastSale(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleSectorChange = (event) => {
    setSector(event.target.value);
  };

  const handleIndustryChange = (event) => {
    setIndustry(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:5001/stocks/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Name: name,
        Symbol: symbol,
        Type: type,
        StockEx: stockex,
        "Last Sale": lastsale,
        Country: country,
        Sector: sector,
        Industry: industry,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNewInvestmentSuccess(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    if (newInvestmentSuccess) {
      setInvestmentMessage(
        "New Investment Added! Redirecting to Investment Page"
      );
      const timer = setTimeout(() => {
        navigate("/investments");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [newInvestmentSuccess, navigate]);

  return (
    <Box pl="650px" pr="650px">
      <Header>
        <FlexBetween>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Add a new investment
          </Typography>
        </FlexBetween>
      </Header>
      <SignUpBox>
        <Typography variant="h4">Add Investment</Typography>
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
            id="symbol"
            label="Symbol"
            type="text"
            variant="outlined"
            margin="normal"
            value={symbol}
            onChange={handleSymbolChange}
            required
            sx={{ width: "99%" }}
          />
          <TextField
            id="type"
            label="Type"
            type="text"
            variant="outlined"
            margin="normal"
            value={type}
            onChange={handleTypeChange}
            required
            sx={{ width: "99%" }}
          />
          <TextField
            id="stockex"
            label="Stock Exchange"
            type="text"
            variant="outlined"
            margin="normal"
            value={stockex}
            onChange={handleStockExChange}
            required
            sx={{ width: "99%" }}
          />
          <TextField
            id="lastsale"
            label="Last Sale Price"
            type="text"
            variant="outlined"
            margin="normal"
            value={lastsale}
            onChange={handleLastSaleChange}
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
            id="sector"
            label="Sector"
            type="text"
            variant="outlined"
            margin="normal"
            value={sector}
            onChange={handleSectorChange}
            sx={{ width: "99%" }}
          />
          <TextField
            id="industry"
            label="Industry"
            type="text"
            variant="outlined"
            margin="normal"
            value={industry}
            onChange={handleIndustryChange}
            sx={{ width: "99%" }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 2, width: "50%" }}
          >
            Add Investment
          </Button>
          {investmentMessage && (
            <Typography color="error">{investmentMessage}</Typography>
          )}
        </SignUpForm>
      </SignUpBox>
    </Box>
  );
};

export default NewInvestment;
