import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  TableContainer,
  Paper,
} from "@mui/material";
import { PieChart, Pie, Legend, Tooltip } from "recharts";
import { useTheme } from "@mui/material/styles";

const Geography = () => {
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    axios
      .get("http://localhost:5001/trades/")
      .then((response) => setData(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  const filteredTrades = data.filter(
    (trade) => trade.userId === userId && trade.isClosed === "Y"
  );

  const filteredCountry = selectedCountry
    ? data.filter((trade) => trade.country === selectedCountry)
    : data;

  const tradesByCountry = Object.entries(
    filteredTrades.reduce((acc, trade) => {
      const { country } = trade;
      if (!acc[country]) {
        acc[country] = 1;
      } else {
        acc[country]++;
      }
      return acc;
    }, {})
  ).map(([country, value]) => ({
    id: country.charAt(0).toUpperCase() + country.slice(1).toLowerCase(),
    value,
  }));

  const pieChartData = tradesByCountry.map((country) => ({
    id: country.id,
    value: country.value,
  }));

  console.log(pieChartData);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Box m="1.5rem 2.5rem">
        <TableContainer
          component={Paper}
          sx={{ backgroundColor: theme.palette.primary[500] }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Country</TableCell>
                <TableCell>Total Trades</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tradesByCountry.map((country) => (
                <TableRow key={country.id}>
                  <TableCell>{country.id}</TableCell>
                  <TableCell>{country.value}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>Total</TableCell>
                <TableCell>
                  {tradesByCountry.reduce(
                    (acc, country) => acc + country.value,
                    0
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box>
        <PieChart width={400} height={400}>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(entry) => entry.id}
            outerRadius={80}
            fill={theme.palette.primary[200]}
            dataKey="value"
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </Box>
    </Box>
  );
};

export default Geography;
