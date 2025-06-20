import React from "react";
import { Box } from "@mui/material";

const DashboardPageWrapper = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #f5faff, #e8f5e9)",
        p: { xs: 2, sm: 3, md: 4 },
      }}
    >
      <Box
        sx={{
          maxWidth: "1400px",
          mx: "auto",
          backgroundColor: "#ffffff",
          borderRadius: 3,
          p: 3,
          boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default DashboardPageWrapper;
