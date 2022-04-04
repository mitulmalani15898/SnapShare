import { useContext, useEffect, useState } from "react";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";

import { AccountContext } from "../AccountProvider";
import SubscriptionDialog from "./SubscriptionDialog";

const tiers = [
  {
    name: "standard",
    title: "Standard",
    price: "0",
    description: [
      "Max upload size 1 MB",
      "5 document uploads",
      "Help center access",
      "Email support",
    ],
  },
  {
    name: "ultimate",
    title: "Ultimate",
    price: "15",
    description: [
      "No limit on file size",
      "No limit on uploads",
      "Help center access",
      "Priority email support",
    ],
  },
];

const Subscription = () => {
  const { getSession } = useContext(AccountContext);

  const [selectedPlan, setSelectedPlan] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    getSession().then((res) => {
      setSelectedPlan(res["custom:subscriptionPlan"]);
    });
  }, []);

  const toggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handlePlanClick = (name) => () => {
    if (name !== selectedPlan) {
      toggleModal();
    }
  };

  const handleChangeSubscriptionPlan = () => {
    const plan = selectedPlan === "standard" ? "ultimate" : "standard";
    const attributeList = [
      new CognitoUserAttribute({
        Name: "custom:subscriptionPlan",
        Value: plan,
      }),
    ];
    getSession().then(({ user }) => {
      user.updateAttributes(attributeList, function (err, result) {
        if (err) {
          setErrorMessage(err.message || JSON.stringify(err));
        } else {
          if (result === "SUCCESS") {
            setSuccessMessage(
              "Your subscription plan has been changed successfully."
            );
            setSelectedPlan(plan);
            toggleModal();
          }
        }
      });
    });
  };

  return (
    <>
      <SubscriptionDialog
        open={openModal}
        handleClose={toggleModal}
        handleChangePlan={handleChangeSubscriptionPlan}
      />
      <Typography
        component="h1"
        variant="h5"
        align="center"
        color="primary.main"
        sx={{ mb: 2 }}
      >
        Subscription Plans
      </Typography>
      {errorMessage && (
        <Alert
          severity="error"
          sx={{
            m: "0 auto 20px",
            width: "max-content",
          }}
        >
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert
          severity="success"
          sx={{
            m: "0 auto 20px",
            width: "max-content",
          }}
        >
          {successMessage}
        </Alert>
      )}
      <Container maxWidth="md" component="main">
        <Grid
          container
          spacing={5}
          alignItems="flex-end"
          justifyContent="center"
        >
          {tiers.map((tier) => {
            const isSelected = tier.name === selectedPlan;
            return (
              <Grid
                item
                key={tier.title}
                xs={12}
                md={4}
                onClick={handlePlanClick(tier.name)}
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Card sx={{ background: isSelected ? "#deecf9" : "" }}>
                  <CardHeader
                    title={tier.title}
                    titleTypographyProps={{ align: "center", fontWeight: 600 }}
                    action={tier.title === "Ultimate" ? <StarIcon /> : null}
                    sx={{
                      color: (theme) =>
                        isSelected
                          ? theme.palette.common.white
                          : theme.palette.primary.main,
                      background: (theme) =>
                        isSelected
                          ? theme.palette.primary.main
                          : theme.palette.grey[300],
                    }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "baseline",
                        mb: 2,
                      }}
                    >
                      <Typography
                        component="h2"
                        variant="h3"
                        color="text.primary"
                      >
                        ${tier.price}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        /mo
                      </Typography>
                    </Box>

                    {tier.description.map((line) => (
                      <Typography
                        component="p"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </CardContent>
                  <CardActions>
                    <Button fullWidth variant="outlined">
                      {tier.name === selectedPlan
                        ? "Current Plan"
                        : "Get started"}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
};

export default Subscription;
