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

  const filteredTrades = data.filter((trade) => trade.userId === userId);

  const formatDirection = (direction) =>
    direction.charAt(0).toUpperCase() + direction.slice(1);

  const formatCurrency = (value) => {
    return isNaN(value) ? "-" : `$${value.toFixed(2)}`;
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
              <TableCell>Price Bought/Sold</TableCell>
              <TableCell>Current Price</TableCell>
              <TableCell>P/L</TableCell>
              <TableCell></TableCell>
              <TableCell>Close</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredTrades.map((trade) => {
              const { price, lastsale, direction } = trade;
              const pl =
                formatDirection(direction) === "Sell"
                  ? parseFloat(price) - parseFloat(lastsale.slice(1))
                  : parseFloat(lastsale.slice(1)) - parseFloat(price);
              const plFormatted = pl.toFixed(2);
              const isPositive = pl > 0;
              return (
                <TableRow key={trade._id}>
                  <TableCell>{trade.symbol}</TableCell>
                  <TableCell>{trade.stockName}</TableCell>
                  <TableCell>{formatDirection(trade.direction)}</TableCell>
                  <TableCell>${trade.price}</TableCell>
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
                    <IconButton>
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
