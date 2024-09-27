import { useEffect, useState } from "react";
import { fetchAllEvents } from "../redux/operations";
import EventItem from "../components/EventItem";
import Grid from "@mui/material/Grid2";
import {
  selectAllEvents,
  selectError,
  selectIsLoading,
} from "../redux/selectors";
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
import { useDispatch, useSelector } from "react-redux";

function EventsList() {
  const events = useSelector(selectAllEvents);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("titleAsc");
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
      case "titleAsc":
        return a.title.localeCompare(b.title);
      case "titleDesc":
        return b.title.localeCompare(a.title);
      case "eventDateAsc":
        return new Date(a.eventDate) - new Date(b.eventDate);
      case "eventDateDesc":
        return new Date(b.eventDate) - new Date(a.eventDate);
      case "organizerAsc":
        return a.organizer.localeCompare(b.organizer);
      case "organizerDesc":
        return b.organizer.localeCompare(a.organizer);
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
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
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
          <FormControl
            variant="outlined"
            sx={{
              minWidth: { xs: 180, sm: 240, md: 300 },
              maxWidth: 340,
              width: "100%",
            }}
          >
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortOption}
              onChange={handleSortChange}
              label="Sort By"
            >
              <MenuItem value="titleAsc">Title A to Z</MenuItem>
              <MenuItem value="titleDesc">Title Z to A</MenuItem>
              <MenuItem value="eventDateDesc">
                Event Date (Latest to Earliest)
              </MenuItem>
              <MenuItem value="eventDateAsc">
                Event Date (Earliest to Latest)
              </MenuItem>
              <MenuItem value="organizerAsc">Organizer A to Z</MenuItem>
              <MenuItem value="organizerDesc">Organizer Z to A</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: currentEvents.length > 0 ? "flex-start" : "center",
            minHeight: "500px",
          }}
        >
          {currentEvents.length === 0 ? (
            <Typography variant="h6" align="center">
              No events available
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {currentEvents.map((event) => (
                <Grid key={event._id} size={{ xs: 12, sm: 6, md: 6, lg: 6 }}>
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

export default EventsList;
