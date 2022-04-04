import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const DeleteModal = ({ open, handleClose, type, handleDeleteFile }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      PaperProps={{ sx: { position: "fixed", top: 40 } }}
    >
      <DialogTitle sx={{ lineHeight: 1.2 }}>
        Are you sure you want to {type} file?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Once you will click on {type} button, your file will be {type}d and
          cannot be recovered.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: "0 20px 20px" }}>
        <Button onClick={handleClose} variant="outlined" color="info">
          Cancel
        </Button>
        <Button onClick={handleDeleteFile} variant="contained" color="error">
          {type}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
