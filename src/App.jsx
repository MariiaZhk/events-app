import { Routes, Route } from "react-router-dom";
import EventsBoardPage from "./pages/EventsBoardPage";
import EventRegistrationPage from "./pages/EventRegistrationPage";
import EventParticipantsPage from "./pages/EventParticipantsPage";
import {
  CssBaseline,
  LinearProgress,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import HomePage from "./pages/HomePage";
import { Suspense } from "react";
import { Header } from "./components/Header";

const App = () => {
  const defaultTheme = createTheme({
    palette: {
      primary: teal,
      secondary: { main: "#96000f" },
      background: {
        default: "#f3fafa",
      },
    },
  });

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/events"
          element={
            <Suspense fallback={<LinearProgress sx={{ mt: 1 }} />}>
              {" "}
              <EventsBoardPage />
            </Suspense>
          }
        />
        <Route path="/registration" element={<EventRegistrationPage />} />
        <Route path="/participants" element={<EventParticipantsPage />} />
      </Routes>
    </ThemeProvider>
  );
};

export default App;
