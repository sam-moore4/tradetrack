import React from "react";
import { Box } from "@mui/material";
import Header from "../../components/Header";

const Dashboard = () => {
  const user = localStorage.getItem("userName");

  return (
    <Box>
      <Header m="1.5rem" title="HOME" />
      Welcome to Trade Track {user}
    </Box>
  );
};

export default Dashboard;
