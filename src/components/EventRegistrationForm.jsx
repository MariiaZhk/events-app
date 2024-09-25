import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  FormControl,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectEventById } from "../redux/selectors";
import { addParticipant } from "../redux/operations";

const EventRegistrationForm = () => {
  const { id } = useParams();
  const event = useSelector((state) => selectEventById(state, id));
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dateOfBirth: "",
    heardFrom: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addParticipant({
        eventId: id,
        ...formData,
      })
    ).catch((error) => {
      console.error("Error adding participant:", error);
    });
  };

  return (
    <Container maxWidth="md">
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          textAlign: "center",
          textTransform: "uppercase",
          fontWeight: "500",
        }}
      >
        Registration Form
      </Typography>

      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            textAlign: "center",
            margin: "normal",
          }}
        >
          Event Title: {event.title}
        </Typography>

        <TextField
          required
          fullWidth
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          required
          fullWidth
          label="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          onChange={handleChange}
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <FormControl component="fieldset" margin="normal">
          <FormLabel id="row-radio-group-label" component="legend">
            Where did you hear about this event?
          </FormLabel>
          <RadioGroup
            row
            name="heardFrom"
            value={formData.heardFrom}
            onChange={handleChange}
          >
            <FormControlLabel
              value="social media"
              control={<Radio />}
              label="Social Media"
            />
            <FormControlLabel
              value="friends"
              control={<Radio />}
              label="Friend"
            />
            <FormControlLabel
              value="myself"
              control={<Radio />}
              label="Found Myself"
            />
          </RadioGroup>
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              fontSize: "1.3rem",
            }}
          >
            Submit
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default EventRegistrationForm;
