import React, { useEffect } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Box,
  Typography,
  Icon,
} from "@mui/material";

export default function DeleteConfirmation({
  confirmDelete,
  onCancel,
  entityName,
  onAgree,
}) {
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setOpen(confirmDelete);
  }, [confirmDelete]);

  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 4,
          px: 2,
          py: 1,
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", pt: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: 1,
          }}
        >
          <WarningAmberIcon
            color="error"
            sx={{ fontSize: 60 }}
          />
        </Box>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#d32f2f" }}>
          Confirm Deletion
        </Typography>
      </DialogTitle>

      <DialogContent>
        <DialogContentText sx={{ textAlign: "center", fontSize: "16px", mb: 2 }}>
          Are you sure you want to delete the selected{" "}
          <strong>{entityName}</strong>? This action cannot be undone.
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          color="error"
          sx={{ px: 4 }}
        >
          Cancel
        </Button>
        <Button
          onClick={onAgree}
          variant="contained"
          color="success"
          sx={{ px: 4 }}
          autoFocus
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
