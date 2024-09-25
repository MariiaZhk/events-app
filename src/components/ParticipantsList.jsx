import { useSelector } from "react-redux";
import {
  selectEventById,
  selectParticipantsByEventId,
} from "../redux/selectors";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Container, Typography, Button, Box, Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import ParticipantItem from "./ParticipantsItem";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";

const ParticipantsList = () => {
  const { id } = useParams();
  const event = useSelector((state) => selectEventById(state, id));
  const participants = useSelector((state) =>
    selectParticipantsByEventId(state, id)
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const participantsPerPage = 9; // Adjust this to your needs

  const totalPages = Math.ceil(participants.length / participantsPerPage);
  const indexOfLastParticipant = currentPage * participantsPerPage;
  const indexOfFirstParticipant = indexOfLastParticipant - participantsPerPage;
  const currentParticipants = participants.slice(
    indexOfFirstParticipant,
    indexOfLastParticipant
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

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

      {currentParticipants.length === 0 ? (
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
        <>
          <Grid container spacing={4}>
            {currentParticipants.map((participant) => (
              <Grid key={participant._id} size={{ xs: 12, md: 4, sm: 6 }}>
                <ParticipantItem
                  id={participant._id}
                  name={participant.fullName}
                  email={participant.email}
                />
              </Grid>
            ))}
          </Grid>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default ParticipantsList;
