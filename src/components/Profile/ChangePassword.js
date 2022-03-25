import { useState, useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import { AccountContext } from "../AccountProvider";

const ChangePassword = () => {
  const { getSession } = useContext(AccountContext);

  const [userDetails, setUserDetails] = useState({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = () => {
    if (!oldPassword) {
      return setErrorMessage("Old password is required.");
    }
    if (!password) {
      return setErrorMessage("New password is required.");
    }
    if (!confirmPassword) {
      return setErrorMessage("Confirm New password is required.");
    }
    if (password !== confirmPassword) {
      return setErrorMessage("New password and confirm must be the same.");
    }
    setErrorMessage("");

    getSession().then(({ user }) => {
      user.changePassword(oldPassword, password, (err, result) => {
        if (err) {
          setErrorMessage(err.message || JSON.stringify(err));
        } else {
          if (result === "SUCCESS") {
            setUserDetails({
              oldPassword: "",
              password: "",
              confirmPassword: "",
            });
            setSuccessMessage("Your password has been changed successfully.");
          }
        }
      });
    });
  };

  const { oldPassword, password, confirmPassword } = userDetails;

  return (
    <Box component="main" sx={{ m: "20px 10px" }}>
      <Typography
        component="h1"
        variant="h5"
        color="primary.main"
        sx={{ mb: 2 }}
      >
        Change Password
      </Typography>
      {errorMessage && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="password"
            name="oldPassword"
            id="oldPassword"
            label="Old Password"
            size="small"
            value={oldPassword}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="password"
            name="password"
            id="password"
            label="New Password"
            size="small"
            value={password}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            type="password"
            id="confirmPassword"
            label="Confirm New Password"
            name="confirmPassword"
            size="small"
            value={confirmPassword}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handlePasswordChange}
      >
        Change Password
      </Button>
    </Box>
  );
};

export default ChangePassword;
