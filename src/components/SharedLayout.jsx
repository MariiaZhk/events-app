import { Box, Container, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      Copyright © Mariia Zhuk | Events Registration App,{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function SharedLayout() {
  return (
    <>
      <Header />
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "92vh",
          flexGrow: 1,
        }}
        maxWidth="lg"
      >
        <Box sx={{ flexGrow: 1, pt: 10, pb: 10 }}>
          <Outlet />
        </Box>
        <Box
          component="footer"
          sx={{
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            py: [3, 6],
            mt: "auto",
          }}
        >
          <Copyright />
        </Box>
      </Container>
    </>
  );
}
