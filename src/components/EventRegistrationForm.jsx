import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectEventById, selectIsLoading } from "../redux/selectors";
import { addParticipant } from "../redux/operations";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "../utils/schemas";
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
  CircularProgress,
} from "@mui/material";

function EventRegistrationForm() {
  const { id } = useParams();
  const event = useSelector((state) => selectEventById(state, id));
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [birthDate, setBirthDate] = useState(null);

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const handleDateChange = (date) => {
    if (date && dayjs(date).isValid()) {
      setBirthDate(date);
      setValue("dateOfBirth", date.toDate(), { shouldValidate: true });
    } else {
      setBirthDate(null);
      setValue("dateOfBirth", null);
    }
  };

  const onSubmit = (data) => {
    dispatch(
      addParticipant({
        eventId: id,
        ...data,
      })
    )
      .then(() => {
        toast.success("Registration successful!");
        reset();
        setBirthDate(null);
        navigate("/events");
      })
      .catch((error) => {
        console.error("Error adding participant:", error);
        toast.error("Error adding participant");
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
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: "600px", margin: "0 auto" }}
      >
        <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
          Event Title: {event.title}
        </Typography>

        <div style={{ position: "relative", marginBottom: "30px" }}>
          <TextField fullWidth label="Full Name" {...register("fullName")} />
          {errors.fullName && (
            <Typography
              variant="caption"
              color="error"
              sx={{
                position: "absolute",
                bottom: "-18px",
                left: 0,
              }}
            >
              {errors.fullName.message}
            </Typography>
          )}
        </div>

        <div style={{ position: "relative", marginBottom: "30px" }}>
          <TextField
            fullWidth
            label="Email"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <Typography
              variant="caption"
              color="error"
              sx={{
                position: "absolute",
                bottom: "-18px",
                left: 0,
              }}
            >
              {errors.email.message}
            </Typography>
          )}
        </div>

        <div style={{ position: "relative", marginBottom: "30px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date of Birth"
              value={birthDate}
              onChange={handleDateChange}
              maxDate={dayjs()}
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
            />
          </LocalizationProvider>
          {errors.dateOfBirth && (
            <Typography
              variant="caption"
              color="error"
              sx={{
                position: "absolute",
                bottom: "-18px",
                left: 0,
              }}
            >
              {errors.dateOfBirth.message}
            </Typography>
          )}
        </div>

        <FormControl component="fieldset">
          <FormLabel id="heard-from-label" component="legend">
            Where did you hear about this event?
          </FormLabel>

          <RadioGroup row aria-labelledby="radio-buttons" defaultValue="">
            <FormControlLabel
              {...register("heardFrom")}
              value="social media"
              control={<Radio />}
              label="Social Media"
            />
            <FormControlLabel
              {...register("heardFrom")}
              value="friends"
              control={<Radio />}
              label="Friend"
            />
            <FormControlLabel
              {...register("heardFrom")}
              value="myself"
              control={<Radio />}
              label="Found Myself"
            />
          </RadioGroup>

          {errors.heardFrom && (
            <Typography
              variant="caption"
              color="error"
              sx={{
                position: "absolute",
                bottom: "-10px",
                left: 0,
              }}
            >
              {errors.heardFrom.message}
            </Typography>
          )}
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{
              fontSize: "1.3rem",
              width: "124px",
              height: "48px",

              "&.Mui-disabled": {
                backgroundColor: "primary.main",
                color: "background.default",
              },
            }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={40} color="inherit" />
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default EventRegistrationForm;
