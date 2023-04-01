import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "../../components/Header";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

const Active = () => {
  const theme = useTheme();
  const userId = localStorage.getItem("userId");
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/trades/")
      .then((response) => setData(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  const filteredTrades = data.filter((trade) => trade.userId === userId);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 2,
    },
    {
      field: "stockName",
      headerName: "Stock Name",
      flex: 2,
    },
    {
      field: "direction",
      headerName: "Direction",
      flex: 2,
    },
    {
      field: "lastsale",
      headerName: "Current Price",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
  ];

  console.log(filteredTrades);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ACTIVE TRADES" subtitle="Your active trades"></Header>
      <Box mt="40px" height="75vph">
        <DataGrid
          rows={filteredTrades}
          getRowId={(row) => row._id}
          columns={columns}
        />
      </Box>
    </Box>
  );
};

export default Active;
