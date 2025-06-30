import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Divider,
  MenuItem,
  Stack,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import CommonPageWrapper from "../layout/PageWrapper";
import { application } from "../../authentication/auth";
import CTLNotification from "../Notification";

const specializations = [
  "Cardiologist",
  "Neurologist",
  "Orthopedic",
  "Pediatrician",
  "Dermatologist",
  "Gynecologist",
];

const DoctorForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    webSite: "",
    address: "",
    specialization: "",
    experience: "",
    fees: "",
    fromTime: "",
    toTime: "",
  });
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
    pagename: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "start" || name === "end") {
      setFormData((prev) => ({
        ...prev,
        timing: {
          ...prev.timing,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await application.post("/doctor/create", formData);
      setNotify({
        isOpen: true,
        type: "success",
        pagename: "Add New Doctor",
        message: response.data.message,
      });
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        webSite: "",
        address: "",
        specialization: "",
        experience: "",
        fees: "",
        timing: { start: "", end: "" },
      });
    } catch (error) {
      setNotify({
        isOpen: true,
        type: "error",
        pagename: "Add New Doctor",
        message: error.response?.data?.message || "Delete failed",
      });
    }
  };

  return (
    <CommonPageWrapper maxWidth={600}>
      <Box textAlign="center" mb={1}>
        <Typography variant="h5" fontWeight="bold">
          <LocalHospitalIcon
            sx={{ verticalAlign: "middle", mr: 1, color: "main.error" }}
          />
          Doctor Registration Form
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={2}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            type="number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Stack>

        <TextField
          fullWidth
          label="Website"
          name="webSite"
          value={formData.webSite}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            select
            label="Specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            required
          >
            {specializations.map((spec) => (
              <MenuItem key={spec} value={spec}>
                {spec}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            label="Experience (in years)"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
          />
        </Stack>

        <TextField
          fullWidth
          label="Consultation Fees"
          name="fees"
          value={formData.fees}
          onChange={handleChange}
        />

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            fullWidth
            label="Timing Start"
            name="start"
            type="time"
            value={formData.fromTime}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            label="Timing End"
            name="end"
            type="time"
            value={formData.toTime}
            onChange={handleChange}
          />
        </Stack>
        <CTLNotification notify={notify} setNotify={setNotify} />
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Stack>
    </CommonPageWrapper>
  );
};

export default DoctorForm;
