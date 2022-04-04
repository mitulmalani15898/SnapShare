import { useContext, useEffect, useState } from "react";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FilterDramaRoundedIcon from "@mui/icons-material/FilterDramaRounded";

import AuthWrapper from "../AuthWrapper";
import { AccountContext } from "../../AccountProvider";

const Signup = () => {
  const { getUserPool } = useContext(AccountContext);

  const [isRegistered, setIsRegistered] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    return () => {
      setIsRegistered(false);
    };
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!firstName) {
      return setErrorMessage("First name is required.");
    }
    if (!lastName) {
      return setErrorMessage("Last name is required.");
    }
    if (!email) {
      return setErrorMessage("Email address is required.");
    }
    if (!password) {
      return setErrorMessage("Password is required.");
    }
    setErrorMessage("");

    const attributeList = [
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      }),
      new CognitoUserAttribute({
        Name: "name",
        Value: firstName,
      }),
      new CognitoUserAttribute({
        Name: "family_name",
        Value: lastName,
      }),
      new CognitoUserAttribute({
        Name: "custom:subscriptionPlan",
        Value: "standard",
      }),
    ];

    const UserPool = getUserPool();
    UserPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        return setErrorMessage(err.message || JSON.stringify(err));
      }
      const cognitoUser = result.user;
      console.log("user name is " + cognitoUser.getUsername());
      setIsRegistered(true);
    });
  };

  const { firstName, lastName, email, password } = userDetails;

  return (
    <AuthWrapper>
      {isRegistered ? (
        <>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              mb: 2,
              color: (theme) => theme.palette.primary.main,
              textAlign: "left !important",
            }}
          >
            Success!
          </Typography>
          <Typography component="h1" variant="body1" sx={{ mb: 2 }}>
            Your registration has been completed successfully.
          </Typography>
          <Typography component="h1" variant="body1" sx={{ mb: 2 }}>
            We have sent you a mail for confirmation of your account, please
            click on the link in the mail to confirm your account.
          </Typography>
          <Typography component="h1" variant="body1">
            If you have already confirmed your account, please{" "}
            {<Link href="/login">login</Link>} to your account!
          </Typography>
        </>
      ) : (
        <>
          <Avatar
            sx={{ m: 1, bgcolor: "secondary.main", width: 44, height: 44 }}
          >
            <FilterDramaRoundedIcon sx={{ width: 34, height: 34 }} />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            {errorMessage && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorMessage}
              </Alert>
            )}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoFocus
                  fullWidth
                  name="firstName"
                  id="firstName"
                  label="First Name"
                  size="small"
                  value={firstName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="lastName"
                  id="lastName"
                  label="Last Name"
                  size="small"
                  value={lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  id="email"
                  label="Email Address"
                  name="email"
                  size="small"
                  value={email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth size="small" variant="outlined">
                  <InputLabel>Password</InputLabel>
                  <OutlinedInput
                    name="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword((prev) => !prev)}
                          onMouseDown={(e) => e.preventDefault()}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </AuthWrapper>
  );
};

export default Signup;
