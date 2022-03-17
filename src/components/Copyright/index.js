import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ position: "fixed", bottom: 20, left: "47%" }}
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" to="/">
        SnapShare
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Copyright;
