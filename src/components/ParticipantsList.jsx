import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid2";
import ParticipantItem from "./ParticipantsItem";
import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  selectEventById,
  selectParticipantsByEventId,
} from "../redux/selectors";
import {
  Container,
  Typography,
  Button,
  Box,
  Stack,
  TextField,
} from "@mui/material";

function ParticipantsList() {
  const { id } = useParams();
  const event = useSelector((state) => selectEventById(state, id));
  const participants = useSelector((state) =>
    selectParticipantsByEventId(state, id)
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const participantsPerPage = 9;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredParticipants = participants.filter(
    (participant) =>
      participant.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(
    filteredParticipants.length / participantsPerPage
  );
  const indexOfLastParticipant = currentPage * participantsPerPage;
  const indexOfFirstParticipant = indexOfLastParticipant - participantsPerPage;
  const currentParticipants = filteredParticipants.slice(
    indexOfFirstParticipant,
    indexOfLastParticipant
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Container
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            textAlign: "center",
            textTransform: "uppercase",
            fontWeight: "500",
          }}
        >
          Registered Participants
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            textAlign: "center",
            margin: "normal",
          }}
        >
          Event Title: {event.title}
        </Typography>

        {participants.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginX: "auto",
              width: "100%",
              maxWidth: 340,
            }}
          >
            <TextField
              label="Search Participants"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name or email"
              sx={{
                minWidth: { xs: 180, sm: 220, md: "100%" },
                maxWidth: "100%",
                width: "100%",
              }}
            />
          </Box>
        )}

        <Box sx={{ flexGrow: 1, mt: 4, minHeight: "400px" }}>
          {participants.length === 0 ? (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                No participants yet. Lead the way by registering first!
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
          ) : currentParticipants.length === 0 ? (
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              No participants match your search.
            </Typography>
          ) : (
            <Grid container spacing={3}>
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
          )}
        </Box>
      </Container>

      {totalPages > 1 && currentParticipants.length > 0 && (
        <Box
          sx={{
            py: 2,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: 4,
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
}

export default ParticipantsList;
