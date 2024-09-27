import { Link } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

function ErrorPage() {
  return (
    <Container sx={{ textAlign: "center", paddingTop: "50px" }}>
      <Typography variant="h1" color="error" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Oops! The page you're looking for doesn't exist.
      </Typography>
      <Typography variant="body1" gutterBottom>
        It looks like the page you are trying to access is unavailable or the
        link is broken.
      </Typography>
      <Box sx={{ marginTop: "30px" }}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/"
          sx={{ fontSize: "1.2rem" }}
        >
          Back to Home
        </Button>
      </Box>
    </Container>
  );
}

export default ErrorPage;
