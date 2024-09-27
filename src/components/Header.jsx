import { AppBar, Toolbar, Typography, Link, Box } from "@mui/material";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import { Link as RouterLink } from "react-router-dom";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Diversity3Icon sx={{ mr: 2 }} />
        <HeaderLink to="/">
          <Typography variant="h6" color="inherit" noWrap>
            Eventer
          </Typography>
        </HeaderLink>
        <Box sx={{ flexGrow: 1 }}>
          <nav>
            <HeaderLink to="/events">EVENTS</HeaderLink>
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
      sx={{ my: 1, mx: 1.5, textDecoration: "none" }}
    >
      {children}
    </Link>
  );
}
export default Header;
