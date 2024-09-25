import { Box, Button, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function HomePage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flexGrow: 1,
        paddingTop: 10,
        paddingBottom: 10,
      }}
    >
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
        sx={{
          textAlign: "center",
        }}
      >
        Discover a seamless event registration journey tailored for every
        occasion!
      </Typography>
      <Stack
        sx={{ mt: 8 }}
        direction="row"
        spacing={10}
        justifyContent="center"
      >
        <Button
          sx={{
            fontSize: "1.3rem",
          }}
          component={RouterLink}
          to="/events"
          variant="contained"
          color="secondary"
        >
          Explore
        </Button>
      </Stack>
    </Box>
  );
}
