import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export default function SharedLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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
            pt: 10,
            pb: 10,
          }}
        >
          <Outlet />
        </Box>
      </Container>
    </Box>
  );
}
