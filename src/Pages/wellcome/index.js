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
import HospitalImage from "../../Images/hospitalHome.jpg";
import DoctorBanner from "../../Images/hospitalHome.jpg";

const WelcomePage = () => {
  const userName = sessionStorage.getItem("userName") || "User";
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 0, // full screen card doesn't need border radius
        }}
      >
        {/* Left Side - Big Image */}
        <Box
          sx={{
            flex: 1.2,
            backgroundImage: `url(${DoctorBanner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            minHeight: 300,
          }}
        />

        {/* Right Side - Content */}
        <Box
          sx={{
            flex: 1,
            p: { xs: 3, md: 5 },
            backgroundColor: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(6px)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            src={HospitalImage}
            sx={{
              width: 100,
              height: 100,
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

          <CelebrationIcon sx={{ fontSize: 40, mt: 2, color: "#ec407a" }} />

          <Typography variant="body1" sx={{ mt: 2, maxWidth: 400 }}>
            We're happy to have you back. Choose where you’d like to go!
          </Typography>

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
