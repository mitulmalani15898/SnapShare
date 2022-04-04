import { useContext, useState } from "react";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FilterDramaRoundedIcon from "@mui/icons-material/FilterDramaRounded";
import Typography from "@mui/material/Typography";

import AuthWrapper from "../AuthWrapper";
import { AccountContext } from "../../AccountProvider";

const ResetPassword = ({ email }) => {
  const { getCognitoUser } = useContext(AccountContext);

  const [resetDetails, setResetDetails] = useState({
    code: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = ({ target: { name, value } }) => {
    setResetDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!code) {
      return setErrorMessage("Verification code is required.");
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

    getCognitoUser(email).confirmPassword(code, password, {
      onSuccess: (data) => {
        console.log("confirmPassword onSuccess data", data);
        setResetDetails({
          code: "",
          password: "",
          confirmPassword: "",
        });
        setSuccessMessage("Your password has been reset successfully.");
      },
      onFailure: (err) => {
        console.log("confirmPassword onFailure err", err);
        setErrorMessage(err.message || JSON.stringify(err));
      },
    });
  };

  const { code, password, confirmPassword } = resetDetails;

  return (
    <AuthWrapper>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main", width: 44, height: 44 }}>
        <FilterDramaRoundedIcon sx={{ width: 34, height: 34 }} />
      </Avatar>
      <Typography component="h1" variant="h5">
        Reset Password
      </Typography>
      <Box
        component="form"
        noValidate
        onSubmit={handleSubmit}
        sx={{ mt: 3, width: 1 }}
      >
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
              size="small"
              id="code"
              label="Verification code"
              name="code"
              value={code}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              type="password"
              id="password"
              label="New password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              size="small"
              type="password"
              id="confirmPassword"
              label="Confirm new password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Reset Password
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </AuthWrapper>
  );
};

export default ResetPassword;
