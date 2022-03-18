import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Dashboard = () => {
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: 1,
        border: (theme) => `1px dashed ${theme.palette.primary.main}`,
        borderRadius: "8px",
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        align="center"
        color="text.primary"
        sx={{ mb: 2 }}
      >
        Upload Documents
      </Typography>

      <Button
        variant="contained"
        sx={{
          fontSize: "22px",
          padding: "10px 40px",
          ":hover": {
            background: "#161616",
          },
        }}
      >
        Select files{" "}
        <CloudUploadIcon
          sx={{ ml: 2, mb: 0.4, height: "30px", width: "30px" }}
        />
      </Button>
      <Typography
        component="h1"
        variant="caption"
        align="center"
        color="text.primary"
        sx={{ m: 2 }}
      >
        or drag files here
      </Typography>
    </Box>
  );
};

export default Dashboard;
