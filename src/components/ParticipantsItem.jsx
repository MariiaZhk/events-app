import { Card, CardContent, Typography } from "@mui/material";

function ParticipantItem({ name, email }) {
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
        <Typography variant="h5" gutterBottom>
          {name}
        </Typography>

        <Typography variant="body" display="block" mt={1} mb={1}>
          <strong>Email:</strong> {email}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ParticipantItem;
