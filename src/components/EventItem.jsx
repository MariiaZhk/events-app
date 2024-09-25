import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { memo } from "react";

function EventItem({ id, title, description, eventDate, organizer }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h4" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h6" display="block" mt={1} mb={1}>
          <strong>Date:</strong> {new Date(eventDate).toLocaleDateString()}
        </Typography>
        <Typography variant="h6" display="block" mt={1} mb={1}>
          <strong>Organizer:</strong> {organizer}
        </Typography>
        <Typography variant="body" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          component={RouterLink}
          to={`/${id}/registration`}
          color="secondary"
          sx={{
            fontSize: "1rem",
          }}
        >
          Register
        </Button>
        <Button
          component={RouterLink}
          to={`/${id}/participants`}
          color="secondary"
          sx={{
            fontSize: "1rem",
          }}
        >
          View
        </Button>
      </CardActions>
    </Card>
  );
}

export default memo(EventItem);
