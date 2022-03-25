import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import ChangePassword from "./ChangePassword";
import DeleteProfile from "./DeleteProfile";
import UpdateProfile from "./UpdateProfile";

const Profile = () => {
  return (
    <Box
      component="main"
      sx={{
        minHeight: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={4.8}>
          <UpdateProfile />
        </Grid>
        <Grid item xs={4.8}>
          <ChangePassword />
        </Grid>
        <Grid item xs={2.4}>
          <DeleteProfile />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
