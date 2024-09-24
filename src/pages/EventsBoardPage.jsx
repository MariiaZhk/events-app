import { Box, Container } from "@mui/material";
import EventsList from "../components/EventsList";

export default function EventsBoardPage() {
  return (
    <Box sx={{ pt: 8, pb: 8 }}>
      {/* <Container>
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Build a unique event registration experience for different event types
        </Typography>
      </Container> */}

      <Container>
        <EventsList />
      </Container>
    </Box>
  );
}
