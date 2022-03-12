import { forwardRef } from "react";
import { Link as RouterLink } from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

const LinkBehavior = forwardRef(({ href, ...restProps }, ref) => {
  // Map href (MUI) -> to (react-router)
  return (
    <RouterLink data-testid="custom-link" ref={ref} to={href} {...restProps} />
  );
});

// A custom theme for this app
const theme = createTheme({
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      },
    },
  },
});

export default theme;
