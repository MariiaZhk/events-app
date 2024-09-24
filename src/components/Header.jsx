import { AppBar, Toolbar, Typography, Link, Box } from "@mui/material";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { Link as RouterLink } from "react-router-dom";

export function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Diversity3Icon sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap sx={{ mr: 2 }}>
          EvENTER
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <nav>
            <HeaderLink to="/">Home</HeaderLink>
            <HeaderLink to="/events">EVENTS</HeaderLink>
            <HeaderLink to="/registration">REGISTRATION</HeaderLink>
            <HeaderLink to="/participants">Participants</HeaderLink>
          </nav>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function HeaderLink({ to, children }) {
  return (
    <Link
      component={RouterLink}
      to={to}
      variant="button"
      color="inherit"
      sx={{ my: 1, mx: 1.5 }}
    >
      {children}
    </Link>
  );
}
