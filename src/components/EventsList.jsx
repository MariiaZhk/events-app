import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, LinearProgress } from "@mui/material";
import EventItem from "./EventItem";
import Grid from "@mui/material/Grid2";

function EventsList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:3000/");
        setEvents(response.data.events);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching events:", error);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <LinearProgress color="secondary" />;
  }

  return (
    <Container maxWidth="lg">
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
