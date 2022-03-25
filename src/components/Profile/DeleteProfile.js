import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import { AccountContext } from "../AccountProvider";

const DeleteProfileDialog = ({ open, handleClose, handleDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="xs"
      PaperProps={{ sx: { position: "fixed", top: 40 } }}
    >
      <DialogTitle sx={{ lineHeight: 1.2 }}>
        Are you sure you want to delete your account?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          After account deletion, your account cannot be recovered. Please make
          sure you want to delete your account.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: "0 20px 20px" }}>
        <Button onClick={handleClose} variant="outlined" color="info">
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const DeleteProfile = () => {
  const { getSession, removeCookies } = useContext(AccountContext);
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleDeleteAccount = () => {
    getSession().then(({ user }) => {
      user.deleteUser(function (err, result) {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        } else {
          if (result === "SUCCESS") {
            toggleModal();
            removeCookies();
            navigate("/login");
          }
        }
      });
    });
  };

  return (
    <>
      <DeleteProfileDialog
        open={openModal}
        handleClose={toggleModal}
        handleDelete={handleDeleteAccount}
      />
      <Box component="main" sx={{ m: "20px 10px" }}>
        <Typography
          component="h1"
          variant="h5"
          color="error.main"
          sx={{ mb: 2 }}
        >
          Delete Account
        </Typography>
        <Button
          type="submit"
          variant="contained"
          color="error"
          sx={{ mb: 2 }}
          onClick={toggleModal}
        >
          Delete Account
        </Button>
      </Box>
    </>
  );
};

export default DeleteProfile;
