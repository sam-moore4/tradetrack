import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMEdiaQuery,
  useMediaQuery,
} from "@mui/material";
import Header from "../../components/Header";
import axios from "axios";
import { SdCardAlert } from "@mui/icons-material";


const Investment = ({
  Name,
  Type,
  StockEx,
  Symbol,
  LastSale}) => {

    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false) //HERE!
  }




const Stocks = () => {
  const [data, setData] = useState([]);
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  useEffect(() => {
    axios
      .get("http://localhost:5001/stocks")
      .then((response) => setData(response.data.data))
      .catch((error) => console.error(error));
  }, []);

  console.log(data);

  return (
    <Box m="1.5rem 2.5rem">
      <Header
        title="INVESTMENTS"
        subtitle="See investments available to add to your portfolio, if your investment option isn't here simply create it"
      />
      {data ? (
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

          {data.map() => (

          )}

        </Box>
      ) : (
        <> Loading... </>
      )}
    </Box>
  );
};

export default Stocks;
