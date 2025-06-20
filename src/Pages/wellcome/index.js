import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Paper,
  useTheme,
} from "@mui/material";
import CelebrationIcon from "@mui/icons-material/Celebration";
import HospitalImage from "../../Images/3568984.jpg";
import DoctorBanner from "../../Images/3568984.jpg";

const WelcomePage = () => {
  const userName = sessionStorage.getItem("userName") || "User";
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          width: "100%",
          maxWidth: 1200,
          borderRadius: 4,
          overflow: "hidden",
        }}
      >
        {/* Left Image Panel */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${DoctorBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: { xs: 200, md: "100%" },
          }}
        ></Box>

        {/* Right Content Panel */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 3, md: 5 },
            backgroundColor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(6px)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            src={HospitalImage}
            sx={{
              width: 80,
              height: 80,
              mb: 2,
              boxShadow: 3,
            }}
          />
          <Typography
            variant="h3"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            CareBridge
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Welcome, <strong>{userName}</strong> 👋
          </Typography>

          <CelebrationIcon
            sx={{ fontSize: 40, mt: 2, color: "#ec407a" }}
          />

          <Typography
            variant="body1"
            sx={{ mt: 2, maxWidth: 400 }}
          >
            We're happy to have you back. Choose where you’d like to go!
          </Typography>

          {/* Buttons Without Grid */}
          <Box
            sx={{
              mt: 4,
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate("/dashboard")}
              sx={{
                backgroundColor: "#00796b",
                "&:hover": { backgroundColor: "#004d40" },
              }}
            >
              🏥 Dashboard
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/expense-table")}
            >
              📊 View Expenses
            </Button>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => navigate("/consultation")}
            >
              🩺 Consultation
            </Button>
          </Box>

          <Typography
            variant="caption"
            sx={{ mt: 5, fontStyle: "italic" }}
          >
            Empowering Healthcare with Technology
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default WelcomePage;
