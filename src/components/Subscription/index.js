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

const tiers = [
  {
    title: "Standard",
    price: "0",
    description: [
      "10 users included",
      "2 GB of storage",
      "Help center access",
      "Email support",
    ],
    buttonText: "Current Plan",
    buttonVariant: "outlined",
    selected: true,
  },
  {
    title: "Ultimate",

    price: "15",
    description: [
      "20 users included",
      "10 GB of storage",
      "Help center access",
      "Priority email support",
    ],
    buttonText: "Get started",
    buttonVariant: "outlined",
    selected: false,
  },
];

function PricingContent() {
  return (
    <>
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="text.primary"
        sx={{ mb: 4 }}
      >
        Plans
      </Typography>

      <Container maxWidth="md" component="main">
        <Grid
          container
          spacing={5}
          alignItems="flex-end"
          justifyContent="center"
        >
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
              sx={{
                cursor: "pointer",
                ":hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <Card
                sx={{
                  background: tier.selected ? "#deecf9" : "",
                  ":hover": {
                    background: "#deecf9",
                  },
                  ":hover > .MuiCardHeader-root": {
                    background: (theme) => theme.palette.primary.main,
                    color: (theme) => theme.palette.common.white,
                  },
                }}
              >
                <CardHeader
                  title={tier.title}
                  titleTypographyProps={{ align: "center", fontWeight: 600 }}
                  action={tier.title === "Ultimate" ? <StarIcon /> : null}
                  sx={{
                    color: (theme) =>
                      tier.selected
                        ? theme.palette.common.white
                        : theme.palette.primary.main,
                    background: (theme) =>
                      tier.selected
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
                  <Button fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default function Pricing() {
  return <PricingContent />;
}
