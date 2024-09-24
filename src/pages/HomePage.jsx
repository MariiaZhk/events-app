import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      Copyright © Mariia Zhuk | Events Registration App,{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function HomePage() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "90vh" }}>
      <Container sx={{ flexGrow: 1, pt: 10, pb: 10 }} maxWidth="md">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
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
            sx={{ px: 5, py: 2 }}
            component={RouterLink}
            to="/events"
            variant="contained"
            color="secondary"
          >
            Explore
          </Button>
        </Stack>
      </Container>

      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Copyright />
      </Container>
    </Box>
  );
}
