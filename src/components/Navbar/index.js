import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";

import { AccountContext } from "../../AccountProvider";

const NavlinkStyle = {
  my: 1,
  mx: 1.5,
  fontSize: "0.875rem",
  textDecoration: "none",
  fontWeight: 500,
  ":hover": {
    color: "#05407a",
  },
};

const Navbar = () => {
  const navigate = useNavigate();

  const { logout } = useContext(AccountContext);

  const handleLogout = () => {
    navigate("/login", { replace: true });
    logout();
  };

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography
          variant="h4"
          color="inherit"
          noWrap
          sx={{
            flexGrow: 1,
            fontWeight: 800,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          <Link
            href="/"
            sx={{ ...NavlinkStyle, my: 0, mx: 0, fontSize: "unset" }}
          >
            SnapShare
          </Link>
        </Typography>
        <nav>
          <Link href="/" sx={NavlinkStyle}>
            Upload Docs
          </Link>
          <Link href="/myDocs" sx={NavlinkStyle}>
            My Docs
          </Link>
          <Link href="/sharedDocs" sx={NavlinkStyle}>
            Shared Docs
          </Link>
          <Link href="/image2pdf" sx={NavlinkStyle}>
            IMAGE to PDF
          </Link>
          <Link href="/subscription" sx={NavlinkStyle}>
            Subscription
          </Link>
          <Link href="/profile" sx={NavlinkStyle}>
            Profile
          </Link>
        </nav>
        <Button
          variant="outlined"
          sx={{ ...NavlinkStyle, fontSize: ".875rem" }}
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
