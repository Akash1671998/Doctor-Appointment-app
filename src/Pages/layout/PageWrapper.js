import React from "react";
import { Box, Paper } from "@mui/material";

const CommonPageWrapper = ({ children, maxWidth = 500 }) => {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        background: "linear-gradient(to right, #dedada, #dedada)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        py: 6,
        px: 2,
        overflowY: "auto",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth,
          p: 4,
          borderRadius: 4,
          backgroundColor: "#ffffff",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
          border: "1px solid #c8e6c9",
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default CommonPageWrapper;
