import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import Copyright from "../Copyright";

const AuthWrapper = ({ children }) => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        marginTop: 8,
        marginBottom: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1px solid rgba(0, 0, 0, 0.12)",
          borderRadius: 2,
          py: 4,
          px: 3,
        }}
      >
        {children}
        <Copyright sx={{ mt: 8 }} />
      </Box>
    </Container>
  );
};

export default AuthWrapper;
