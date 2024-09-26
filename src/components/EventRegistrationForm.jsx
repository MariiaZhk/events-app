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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectEventById } from "../redux/selectors";
import { addParticipant } from "../redux/operations";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const EventRegistrationForm = () => {
  const { id } = useParams();
  const event = useSelector((state) => selectEventById(state, id));
  const dispatch = useDispatch();

  const initialFormState = {
    fullName: "",
    email: "",
    dateOfBirth: null,
    heardFrom: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      dateOfBirth: date ? date.format("MM-DD-YYYY") : "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addParticipant({
        eventId: id,
        ...formData,
      })
    )
      .then(() => {
        toast.success("Registration successful!");
        setFormData(initialFormState);
      })
      .catch((error) => {
        console.error("Error adding participant:", error);
        toast.error("Error adding participant.");
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

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Date of Birth"
            value={formData.dateOfBirth ? dayjs(formData.dateOfBirth) : null}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
              },
            }}
          />
        </LocalizationProvider>

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
              control={<Radio required />}
              label="Social Media"
            />
            <FormControlLabel
              value="friends"
              control={<Radio required />}
              label="Friend"
            />
            <FormControlLabel
              value="myself"
              control={<Radio required />}
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
