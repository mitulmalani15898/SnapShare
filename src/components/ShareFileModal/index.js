import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const ShareFileModal = ({
  open,
  email,
  setEmail,
  emailError,
  handleClose,
  handleShareFile,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      PaperProps={{ sx: { position: "fixed", top: 40 } }}
    >
      <DialogTitle sx={{ lineHeight: 1.2 }}>
        Provide email address of the user with whom you have to share the
        document
      </DialogTitle>
      <DialogContent>
        {emailError && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {emailError}
          </Alert>
        )}
        <TextField
          label="Email"
          size="small"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ my: 1, width: 1 }}
        />
      </DialogContent>
      <DialogActions sx={{ p: "0 20px 20px", justifyContent: "center" }}>
        <Button onClick={handleClose} variant="outlined" color="info">
          Cancel
        </Button>
        <Button onClick={handleShareFile} variant="contained" color="info">
          Share
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ShareFileModal;
