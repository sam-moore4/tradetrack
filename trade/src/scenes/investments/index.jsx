import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  IconButton,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Pagination,
  TextField,
  Modal,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Header from "../../components/Header";
import axios from "axios";
import { Category, SdCardAlert, AddCircle } from "@mui/icons-material";

const Investment = ({
  _id,
  Name,
  Type,
  StockEx,
  Symbol,
  LastSale,
  Country,
  Sector,
  Industry,
}) => {
  const theme = useTheme();
  const user = localStorage.getItem("userId");
  const [userId, setUserId] = useState(user);
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [stockId, setStockId] = useState(_id);
  const [stockName, setStockName] = useState(Name);
  const [symbol, setSymbol] = useState(Symbol);
  const [direction, setDirection] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5001/trades/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        stockId: stockId,
        symbol: symbol,
        lastsale: LastSale,
        stockName: stockName,
        direction: direction,
        price: price,
        date: date,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[500]}
          gutterBottom
        >
          {Symbol}
        </Typography>
        <Typography variant="h5" component="div">
          {Name}
        </Typography>
        <Typography />

        <Typography variant="body2">
          {Type}- {StockEx}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
        <IconButton variant="primary" size="small" onClick={handleOpen}>
          <AddCircle />
        </IconButton>
        <Modal
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          open={open}
          onClose={handleClose}
        >
          <Box
            sx={{
              width: "50%",
              height: "60%",
              bgcolor: theme.palette.primary[600],
              padding: "2rem",
              borderRadius: "0.5rem",
            }}
          >
            <Typography variant="h3" gutterBottom>
              Add New Trade
            </Typography>
            <Box>
              <Typography variant="h4"> {stockName} </Typography>
              <Typography variant="h4"> {symbol} </Typography>
              <FormControl variant="outlined" fullWidth mb={2}>
                <InputLabel id="direction-label">Direction</InputLabel>
                <Select
                  labelId="direction-label"
                  id="direction"
                  value={direction}
                  onChange={(e) => setDirection(e.target.value)}
                  label="Direction"
                >
                  <MenuItem value="buy">Buy</MenuItem>
                  <MenuItem value="sell">Sell</MenuItem>
                </Select>
              </FormControl>
              <TextField
                required
                id="price"
                label="Price"
                variant="outlined"
                fullWidth
                margin="normal"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <TextField
                required
                id="date"
                label="Date"
                variant="outlined"
                fullWidth
                margin="normal"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button variant="outlined" onClick={handleClose} sx={{ mr: 1 }}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit}>
                  Add
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{ color: theme.palette.secondary[200] }}
      >
        <CardContent>
          <Typography> Id: {_id}</Typography>
          <Typography> Name: {Name}</Typography>
          <Typography> Symbol: {Symbol}</Typography>
          <Typography> Last Sale: {LastSale}</Typography>
          <Typography> Country: {Country}</Typography>
          <Typography> Sector: {Sector}</Typography>
          <Typography> Industry: {Industry}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Stocks = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(30);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();

  useEffect(() => {
    axios
      .get("http://localhost:5001/stocks")
      .then((response) => setData(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const filteredData = data.filter((item) =>
    item.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const numPages = Math.ceil(filteredData.length / perPage);
  const startIndex = (page - 1) * perPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + perPage);

  const handleNewInvestment = () => {
    navigate("/addnewinvestment");
  };

  console.log(data);

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="INVESTMENTS"
        subtitle="See investments available to add to your portfolio, if your investment option isn't here simply create it"
      />
      <Box m="1.5rem">
        <Button onClick={handleNewInvestment} variant="contained">
          <Typography>
            Add New Investment <AddCircle />
          </Typography>
        </Button>
      </Box>
      <Box m="1.5rem">
        <TextField
          label="Search by investment"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </Box>
      {data ? (
        <>
          <Box
            mt="20px"
            display="grid"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            justifyContent="space-between"
            rowGap="20px"
            columnGap="1.33%"
            sx={{
              "&> div": { gridColumn: isNonMobile ? undefined : "span 4" }, //selecting child elements of all component so on mobile it takes up entire width if mobile screen
            }}
          >
            {paginatedData.map(
              ({
                _id,
                Name,
                Type,
                StockEx,
                Symbol,
                "Last Sale": LastSale,
                "Net Change": NetChange,
                "% Change": PercentChange,
                Country,
                Volume,
                Sector,
                Industry,
              }) => (
                <Investment
                  key={_id}
                  _id={_id}
                  Name={Name}
                  Type={Type}
                  StockEx={StockEx}
                  Symbol={Symbol}
                  LastSale={LastSale}
                  NetChange={NetChange}
                  PercentChange={PercentChange}
                  Country={Country}
                  Volume={Volume}
                  Sector={Sector}
                  Industry={Industry}
                />
              )
            )}
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            mt="2rem"
            sx={{ "& .MuiPaginationItem-root": { color: "primary.main" } }}
          >
            <Pagination
              count={Math.ceil(data.length / perPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      ) : (
        <> Loading... </>
      )}
    </Box>
  );
};

export default Stocks;
