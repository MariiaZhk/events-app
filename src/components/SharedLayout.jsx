import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function SharedLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box sx={{ width: "100%" }}>
        <Header />
      </Box>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
        maxWidth="lg"
      >
        <Box
          sx={{
            flexGrow: 1,
            pt: 6,
            pb: 6,
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
}
export default SharedLayout;
