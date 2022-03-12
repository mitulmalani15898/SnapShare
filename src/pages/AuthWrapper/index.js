import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Copyright from "../../components/Copyright";

const AuthWrapper = ({ children }) => {
  return (
    <Container
      component="main"
      maxWidth="sm"
      sx={{
        marginTop: 8,
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
          border: "1px solid #d0cece",
          borderRadius: 2,
          p: 4,
        }}
      >
        {children}
        <Copyright sx={{ mt: 8 }} />
      </Box>
    </Container>
  );
};

export default AuthWrapper;
