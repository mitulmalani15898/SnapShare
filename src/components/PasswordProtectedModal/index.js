import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const PasswordProtectedModal = ({
  passwordError,
  selectedFile,
  open,
  handleClose,
  password,
  setPassword,
  handleDownloadFile,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      PaperProps={{ sx: { position: "fixed", top: 40 } }}
    >
      <DialogTitle sx={{ lineHeight: 1.2 }}>
        {selectedFile?.password.S
          ? "Please provide password as file is password protected."
          : "Please click on download button to download file."}
      </DialogTitle>
      <DialogContent>
        {passwordError && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {passwordError}
          </Alert>
        )}
        {!!selectedFile?.password.S && (
          <TextField
            name="password"
            id="password"
            label="Password"
            size="small"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ my: 1, width: 1 }}
          />
        )}
      </DialogContent>
      <DialogActions sx={{ p: "0 20px 20px", justifyContent: "center" }}>
        <Button onClick={handleClose} variant="outlined" color="info">
          Cancel
        </Button>
        <Button onClick={handleDownloadFile} variant="contained" color="info">
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PasswordProtectedModal;
