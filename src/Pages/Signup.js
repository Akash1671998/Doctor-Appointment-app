import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Grid,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { ToastContainer } from 'react-toastify';
import { APIUrl, handleError, handleSuccess } from '../utils';
import loginIllustration from "../Images/Doctor.svg"; // doctor-themed image

function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
    role: ''
  });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    if (!name || !email || !password) {
      return handleError('Name, email, and password are required');
    }

    try {
      const response = await fetch(`${APIUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupInfo)
      });

      const result = await response.json();
      const { success, message, error } = result;

      if (success) {
        handleSuccess(message);
        setTimeout(() => navigate('/login'), 1000);
      } else if (error) {
        handleError(error?.details?.[0]?.message || 'Signup failed');
      } else {
        handleError(message);
      }
    } catch (err) {
      handleError(err.message || 'Signup failed');
    }
  };

  return (
    <Grid
      container
      sx={{
        minHeight: '100vh',
        backgroundColor: '#e8f5e9',
      }}
    >
      {/* Left: Illustration */}
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
          alt="Signup Illustration"
          style={{ maxWidth: '80%', height: 'auto' }}
        />
        <Typography variant="h5" sx={{ mt: 2, color: '#444', fontWeight: 600 }}>
          Join the Health Portal Today
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 1, color: '#666', textAlign: 'center', maxWidth: 300 }}
        >
          Register to book appointments, manage your health records, and connect with doctors.
        </Typography>
      </Grid>

      {/* Right: Signup Form */}
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
          onSubmit={handleSignup}
          sx={{
            width: '100%',
            maxWidth: 400,
            backgroundColor: 'white',
            borderRadius: 2,
            p: 4,
            boxShadow: 4,
          }}
          noValidate
        >
          <Box
            sx={{
              backgroundColor: "#e3f2fd",
              borderRadius: "50%",
              padding: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              mb: 2,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              src={loginIllustration}
              alt="App Logo"
              style={{ width: '60px', height: '60px', objectFit: 'contain' }}
            />
          </Box>

          <Typography
            variant="h6"
            align="center"
            sx={{ color: '#1976d2', fontWeight: 'bold', mb: 2 }}
          >
            Create your health account
          </Typography>

          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={signupInfo.name}
            onChange={handleChange}
            margin="normal"
            size="small"
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={signupInfo.email}
            onChange={handleChange}
            margin="normal"
            size="small"
            required
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={signupInfo.password}
            onChange={handleChange}
            margin="normal"
            size="small"
            required
          />
          <FormControl fullWidth margin="normal" size="small" required>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={signupInfo.role}
              onChange={handleChange}
              onOpen={handleOpen}
              onClose={handleClose}
              label="Role"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="ROLE_USERS">Patient</MenuItem>
              {/* You can add doctor/admin roles if needed */}
            </Select>
          </FormControl>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, mb: 2, py: 1 }}
          >
            Signup
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2">
                Already registered?{' '}
                <Link
                  to="/login"
                  style={{
                    textDecoration: 'none',
                    color: '#1976d2',
                    fontWeight: 500,
                  }}
                >
                  Login here
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

export default Signup;
