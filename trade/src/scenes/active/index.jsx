import { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";

const Active = () => {
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    axios
      .get("http://localhost:5001/trades/")
      .then((response) => setData(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  const filteredTrades = data.filter(
    (trade) => trade.userId === userId && trade.isClosed === "N"
  );

  const formatDirection = (direction) =>
    direction.charAt(0).toUpperCase() + direction.slice(1);

  const formatCurrency = (value) => {
    return isNaN(value) ? "-" : `$${value.toFixed(2)}`;
  };

  const setIsClosed = (tradeId) => {
    const confirmClose = window.confirm(
      "Are you sure you want to close this trade?"
    );
    if (confirmClose) {
      axios
        .put(`http://localhost:5001/trades/${tradeId}`, {
          isClosed: "Y",
        })
        .then((response) => {
          // update data state after successful PUT request
          const updatedData = data.map((trade) =>
            trade._id === tradeId ? { ...trade, isClosed: "Y" } : trade
          );
          setData(updatedData);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <Box m="1.5rem 2.5rem">
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: theme.palette.primary[500] }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Stock Name</TableCell>
              <TableCell>Direction</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Price Bought/Sold</TableCell>
              <TableCell>Total Value</TableCell>
              <TableCell>Current Price</TableCell>
              <TableCell>P/L</TableCell>
              <TableCell></TableCell>
              <TableCell>Close</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTrades.map((trade) => {
              const getTotalValue = (price, quantity) => {
                return isNaN(price) || isNaN(quantity)
                  ? "-"
                  : formatCurrency(price * quantity);
              };
              const { price, lastsale, direction } = trade;
              const pl =
                formatDirection(direction) === "Sell"
                  ? (parseFloat(price) - parseFloat(lastsale.slice(1))) *
                    trade.quantity
                  : (parseFloat(lastsale.slice(1)) - parseFloat(price)) *
                    trade.quantity;
              const plFormatted = pl.toFixed(2);
              const isPositive = pl > 0;
              return (
                <TableRow key={trade._id}>
                  <TableCell>{trade.symbol}</TableCell>
                  <TableCell>{trade.stockName}</TableCell>
                  <TableCell>{formatDirection(trade.direction)}</TableCell>
                  <TableCell>{trade.quantity}</TableCell>
                  <TableCell>${trade.price}</TableCell>
                  <TableCell>
                    {getTotalValue(parseFloat(trade.price), trade.quantity)}
                  </TableCell>
                  <TableCell>{trade.lastsale}</TableCell>
                  <TableCell>{formatCurrency(pl)}</TableCell>
                  <TableCell>
                    {isPositive ? (
                      <ArrowUpwardIcon style={{ color: "green" }} />
                    ) : (
                      <ArrowDownwardIcon style={{ color: "red" }} />
                    )}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => setIsClosed(trade._id)}>
                      <DoNotDisturbAltIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Active;
