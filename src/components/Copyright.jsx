import { Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      Copyright © Mariia Zhuk | EVENTER, Events Registration App,{" "}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default Copyright;
