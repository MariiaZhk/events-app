import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  LinearProgress,
  Pagination,
  Box,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllEvents,
  selectError,
  selectIsLoading,
} from "../redux/selectors";
import { fetchAllEvents } from "../redux/operations";
import EventItem from "./EventItem";

function EventsList() {
  const events = useSelector(selectAllEvents);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4;

  const totalPages = Math.ceil(events.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (isLoading) {
    return <LinearProgress color="secondary" />;
  }
  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

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
        Upcoming Events
      </Typography>

      {currentEvents.length === 0 ? (
        <Typography variant="h6">No events available</Typography>
      ) : (
        <>
          <Grid container spacing={4}>
            {currentEvents.map((event) => (
              <Grid key={event._id} size={{ xs: 12, sm: 6 }}>
                <EventItem
                  id={event._id}
                  title={event.title}
                  description={event.description}
                  eventDate={event.eventDate}
                  organizer={event.organizer}
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
}

export default EventsList;
