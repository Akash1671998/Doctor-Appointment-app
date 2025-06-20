import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Typography,
  Box,
} from "@mui/material";

const DynamicFormDialog = ({
  open,
  columns = [],
  initialData = {},
  onSubmit,
  onCancel,
  title = "Form",
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    setFormData(initialData || {});
  }, [initialData, open]);

  const handleChange = (field) => (event) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleFormSubmit = () => {
    onSubmit(formData);
  };

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 4,
          paddingX: 2,
          paddingY: 1,
          boxShadow: 5,
          backgroundColor: "#f9fafe",
        },
      }}
    >
      {/* Title */}
      <DialogTitle sx={{ textAlign: "center", mt: 2 }}>
        <Typography variant="h6" fontWeight="bold" color="primary.main">
          {title}
        </Typography>
      </DialogTitle>

      {/* Content */}
      <DialogContent>
  <Grid container spacing={2} sx={{ mt: 1 }}>
    {columns
      .filter((col) => col.allowForm)
      .map((col) => (
        <Grid item xs={12} key={col.field}>
          <TextField
            label={col.headerName || col.field}
            fullWidth
            value={formData[col.field] || ""}
            onChange={handleChange(col.field)}
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: "#fff",
              "& .MuiInputBase-root": {
                height: 50, // 👈 height increased
              },
            }}
          />
        </Grid>
      ))}
  </Grid>
</DialogContent>
      {/* Actions */}
      <DialogActions sx={{ justifyContent: "center", mb: 2, mt: 1 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          color="error"
          sx={{ px: 4 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleFormSubmit}
          color="success"
          variant="contained"
          sx={{ px: 4 }}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DynamicFormDialog;
