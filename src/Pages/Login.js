import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { ToastContainer } from "react-toastify";
import { APIUrl, handleError, handleSuccess } from "../utils";
import loginIllustration from "../Images/Doctor.svg"; // 👈 Use a doctor-themed image
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login({ setIsAuthenticated }) {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("Email and password are required");
    }

    try {
      const url = `${APIUrl}/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      });

      const result = await response.json();
      const { success, message, error } = result;
      const jwtToken = result.data?.token;
      const name = result.data?.name;
      const role = result.data.role;

      if (success) {
        setIsAuthenticated(true);
        handleSuccess(message);
        sessionStorage.setItem("token", jwtToken);
        sessionStorage.setItem("loggedInUser", name);
        sessionStorage.setItem("role", role);
        setTimeout(() => {
          navigate("/welcome");
        }, 1000);
      } else if (error) {
        const details = error?.details[0]?.message;
        handleError(details);
      }
    } catch (err) {
      handleError(err.message || "Login failed");
    }
  };

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f0f8ff",
      }}
    >
      <Grid
        item
        xs={false}
        sm={6}
        sx={{
          background: "linear-gradient(135deg, #b3e5fc, #c8e6c9)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          p: 4,
          borderRadius: "0 20px 20px 0",
        }}
      >
        <img
          src={loginIllustration}
          alt="Doctor illustration"
          style={{ maxWidth: "80%", height: "auto" }}
        />
        <Typography variant="h5" sx={{ mt: 2, color: "#444", fontWeight: 600 }}>
          Book Appointments with Ease
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1, color: "#666", textAlign: "center", maxWidth: 300 }}
        >
          Your health is important. Login to schedule consultations with your doctor.
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        sm={6}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 4,
          borderRadius: "20px 0 0 20px",
          background: "linear-gradient(135deg, #ffffff, #e3f2fd)",
        }}
      >
        <Box
          component="form"
          onSubmit={handleLogin}
          sx={{
            width: "100%",
            maxWidth: 400,
            backgroundColor: "white",
            borderRadius: 2,
            p: 4,
            boxShadow: 4,
          }}
          noValidate
        >
          <Box
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mb: 2,
  }}
>
  <Box
    sx={{
      backgroundColor: "#e3f2fd",
      borderRadius: "50%",
      padding: "12px",
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      mb: 1,
    }}
  >
    <img
      src={loginIllustration}
      alt="App Logo"
      style={{ width: "60px", height: "60px", objectFit: "contain" }}
    />
  </Box>
  <Typography
    variant="h6"
    align="center"
    sx={{
      color: "#1976d2",
      fontWeight: "bold",
      mb: 1,
    }}
  >
    Login to Your Health Portal
  </Typography>
</Box>
          <TextField
            fullWidth
            size="small"
            label="Email"
            name="email"
            type="email"
            value={loginInfo.email}
            onChange={handleChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            size="small"
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={loginInfo.password}
            onChange={handleChange}
            margin="normal"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2, py: 1 }}
          >
            Login
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{
                    textDecoration: "none",
                    color: "#1976d2",
                    fontWeight: 500,
                  }}
                >
                  Sign up
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <ToastContainer />
    </Grid>
  );
}

export default Login;
