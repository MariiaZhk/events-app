import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  LinearProgress,
  Pagination,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAllEvents,
  selectError,
  selectIsLoading,
} from "../redux/selectors";
import { fetchAllEvents } from "../redux/operations";
import EventItem from "../components/EventItem";

function EventsList() {
  const events = useSelector(selectAllEvents);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("title");
  const eventsPerPage = 4;

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  useEffect(() => {
    const totalPages = Math.ceil(events.length / eventsPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [events, currentPage, eventsPerPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setCurrentPage(1);
  };

  const sortedEvents = [...events].sort((a, b) => {
    switch (sortOption) {
      case "title":
        return a.title.localeCompare(b.title);
      case "eventDate":
        return new Date(b.eventDate) - new Date(a.eventDate);
      case "organizer":
        return a.organizer.localeCompare(b.organizer);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedEvents.length / eventsPerPage);
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = sortedEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  if (isLoading) {
    return <LinearProgress color="secondary" />;
  }
  if (error) {
    return <Typography color="error">Error: {error}</Typography>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          mb={2}
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

        <Box sx={{ mb: 3, textAlign: "center" }}>
          <FormControl variant="outlined" sx={{ minWidth: 300 }}>
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortOption}
              onChange={handleSortChange}
              label="Sort By"
            >
              <MenuItem value="title">Title A to Z</MenuItem>
              <MenuItem value="eventDate">
                Event Date (Latest to Earliest)
              </MenuItem>
              <MenuItem value="organizer">Organizer A to Z</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ flexGrow: 1 }}>
          {currentEvents.length === 0 ? (
            <Typography variant="h6">No events available</Typography>
          ) : (
            <Grid container spacing={3}>
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
          )}
        </Box>
      </Container>

      {totalPages > 1 && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 1,
            py: 2,
            position: "sticky",
            bottom: 0,
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

export default EventsList;
