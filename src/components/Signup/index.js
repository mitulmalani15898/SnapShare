import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import UserPool from "../../utility/UserPool";

const Signup = () => {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

    // const attributeList = [];
    // const dataEmail = {
    //   Name: "email",
    //   Value: email,
    // };
    // const attributeEmail = new CognitoUserAttribute(dataEmail);
    // attributeList.push(attributeEmail);

    UserPool.signUp(email, password, [], null, (err, result) => {
      if (err) {
        return setErrorMessage(err.message || JSON.stringify(err));
      }
      // console.log("result", result);
      const cognitoUser = result.user;
      console.log("user name is " + cognitoUser.getUsername());
      navigate("/login");
    });
  };

  const { firstName, lastName, email, password } = userDetails;

  return (
    <>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
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
  );
};

export default Signup;
