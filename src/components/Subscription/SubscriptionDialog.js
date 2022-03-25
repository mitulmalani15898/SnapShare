import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const SubscriptionDialog = ({ open, handleClose, handleChangePlan }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      PaperProps={{ sx: { position: "fixed", top: 40 } }}
    >
      <DialogTitle sx={{ lineHeight: 1.2 }}>
        Are you sure you want to change your subscription plan?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Once you will click on change button, your subscription plan will be
          changed and takes effect immediately.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: "0 20px 20px" }}>
        <Button onClick={handleClose} variant="outlined" color="info">
          Cancel
        </Button>
        <Button onClick={handleChangePlan} variant="contained" color="info">
          change
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SubscriptionDialog;
