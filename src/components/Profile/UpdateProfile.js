import { useContext, useState, useEffect } from "react";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

import { AccountContext } from "../AccountProvider";

const UpdateProfile = () => {
  const { getSession } = useContext(AccountContext);

  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getSession().then(({ name, family_name, email }) => {
      setUserDetails({ firstName: name, lastName: family_name, email: email });
    });
  }, []);

  const handleChange = ({ target: { name, value } }) => {
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateDetails = () => {
    if (!firstName) {
      return setErrorMessage("First name is required.");
    }
    if (!lastName) {
      return setErrorMessage("Last name is required.");
    }
    if (!email) {
      return setErrorMessage("Email address is required.");
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
    ];

    getSession().then(({ user }) => {
      user.updateAttributes(attributeList, function (err, result) {
        if (err) {
          setErrorMessage(err.message || JSON.stringify(err));
        } else {
          if (result === "SUCCESS") {
            setSuccessMessage("Your profile has been updated successfully.");
          }
        }
      });
    });
  };

  const { firstName, lastName, email } = userDetails;

  return (
    <Box component="main" sx={{ m: "20px 10px" }}>
      <Typography
        component="h1"
        variant="h5"
        color="primary.main"
        sx={{ mb: 2 }}
      >
        Profile Details
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
            name="firstName"
            id="firstName"
            label="First Name"
            size="small"
            value={firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
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
      </Grid>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={handleUpdateDetails}
      >
        Update Details
      </Button>
    </Box>
  );
};

export default UpdateProfile;
