import { useSelector } from "react-redux";
import {
  selectEventById,
  selectParticipantsByEventId,
} from "../redux/selectors";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Container, Typography, Button, Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ParticipantItem from "./ParticipantsItem";

const ParticipantsList = () => {
  const { id } = useParams();
  const event = useSelector((state) => selectEventById(state, id));
  const participants = useSelector((state) =>
    selectParticipantsByEventId(state, id)
  );

  return (
    <Container maxWidth="lg">
      <Typography
        mb={4}
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          textTransform: "uppercase",
          fontWeight: "500",
        }}
      >
        {event.title} Participants
      </Typography>

      {participants.length === 0 ? (
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6" sx={{ textAlign: "center" }}>
            No participants are registered yet, which means you can be the very
            first to join this event!
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
              to={`/${id}/registration`}
              variant="contained"
              color="secondary"
            >
              Register
            </Button>
          </Stack>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {participants.map((participant) => (
            <Grid key={participant._id} size={{ xs: 12, md: 4, sm: 6 }}>
              <ParticipantItem
                id={participant._id}
                name={participant.fullName}
                email={participant.email}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ParticipantsList;
