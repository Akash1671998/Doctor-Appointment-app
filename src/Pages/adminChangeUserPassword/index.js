import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  MenuItem,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Close,
  LockReset as LockResetIcon,
} from "@mui/icons-material";
import { application } from "../../authentication/auth";
import { APIUrl } from "../../utils";
import CommonPageWrapper from "../layout/PageWrapper";


const PasswordResetComponent = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    old: false,
    new: false,
  });

  const [defaultMode, setDefaultMode] = useState(false);

  useEffect(() => {
    application
      .get(`${APIUrl}/users/list`)
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.error("User fetch error:", err));
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const toggleVisibility = (field) => {
    setShowPassword((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSubmit = () => {
    const data = {
      email: selectedUser,
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    };
    application
      .post("/auth/changePassword", data)
      .then(() => {})
      .catch(() => {});
  };

  return (
    <CommonPageWrapper maxWidth={500}>
      {/* ✅ Only this part is inside wrapper now */}
      <Box sx={{ textAlign: "center", position: "relative" }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          <LockResetIcon sx={{ verticalAlign: "middle", mr: 1 }} />
          {defaultMode ? "Set Default Password For User" : "Reset User Password"}
        </Typography>
        {defaultMode && (
          <IconButton
            onClick={() => setDefaultMode(false)}
            color="error"
            size="small"
            sx={{ position: "absolute", right: 0, top: 0 }}
          >
            <Close />
          </IconButton>
        )}
      </Box>

      <Divider sx={{ my: 3 }} />

      <TextField
        fullWidth
        select
        label="Select User"
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        sx={{ mb: 3 }}
      >
        {users &&
          users.map((user) => (
            <MenuItem key={user._id} value={user.email}>
              {user.name}
            </MenuItem>
          ))}
      </TextField>

      {!defaultMode &&
        ["oldPassword", "newPassword"].map((field) => (
          <TextField
            key={field}
            fullWidth
            name={field}
            label={field === "oldPassword" ? "Old Password" : "New Password"}
            type={showPassword[field.replace("Password", "")] ? "text" : "password"}
            value={formData[field]}
            onChange={handleChange}
            sx={{ mb: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      toggleVisibility(field.replace("Password", ""))
                    }
                  >
                    {showPassword[field.replace("Password", "")] ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        ))}

      <Box display="flex" justifyContent="space-between" mt={3}>
        {!defaultMode && (
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              setDefaultMode(true);
              setFormData({ oldPassword: "", newPassword: "" });
            }}
          >
            Default Password
          </Button>
        )}
        <Button variant="contained" color="success" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </CommonPageWrapper>
  );
};

export default PasswordResetComponent;
