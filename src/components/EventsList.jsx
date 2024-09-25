import { useEffect } from "react";
import { Container, Typography, LinearProgress } from "@mui/material";
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

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

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
        {" "}
        Upcoming Events
      </Typography>

      {events.length === 0 ? (
        <Typography variant="h6">No events available</Typography>
      ) : (
        <Grid container spacing={4}>
          {events.map((event) => (
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
      )}
    </Container>
  );
}

export default EventsList;
