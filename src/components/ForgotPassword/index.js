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
import { AccountContext } from "../AccountProvider";
import ResetPassword from "../ResetPassword";

const ForgotPassword = () => {
  const { getCognitoUser } = useContext(AccountContext);

  const [email, setEmail] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = ({ target: { value } }) => {
    setEmail(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) {
      return setErrorMessage("Email address is required.");
    }
    setErrorMessage("");

    getCognitoUser(email).forgotPassword({
      onSuccess: (data) => {
        console.log("forgotPassword onSuccess data", data);
      },
      onFailure: (err) => {
        console.log("forgotPassword onFailure err", err);
        setErrorMessage(err.message || JSON.stringify(err));
      },
      inputVerificationCode: (data) => {
        console.log("forgotPassword inputVerificationCode data", data);
        setIsCodeSent(true);
      },
    });
  };

  if (isCodeSent) {
    return <ResetPassword email={email} />;
  }

  return (
    <AuthWrapper>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main", width: 44, height: 44 }}>
        <FilterDramaRoundedIcon sx={{ width: 34, height: 34 }} />
      </Avatar>
      <Typography component="h1" variant="h5">
        Forgot Password
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
        <TextField
          fullWidth
          size="small"
          type="email"
          id="email"
          label="Email Address"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Send Verification Code
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

export default ForgotPassword;
