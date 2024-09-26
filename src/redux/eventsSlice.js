import { createSlice } from "@reduxjs/toolkit";
import { fetchAllEvents, addParticipant } from "./operations";

const initialState = {
  events: [],

  isLoading: false,
  error: null,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllEvents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllEvents.fulfilled, (state, { payload }) => {
        state.events = payload.map((event) => ({
          ...event,
          participants: event.participants || [],
        }));
        state.isLoading = false;
      })

      .addCase(fetchAllEvents.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
      })
      .addCase(addParticipant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addParticipant.fulfilled, (state, { payload }) => {
        const { eventId, participant } = payload;
        const eventIndex = state.events.findIndex(
          (event) => event._id === eventId
        );

        if (eventIndex !== -1) {
          state.events[eventIndex] = {
            ...state.events[eventIndex],
            participants: [
              ...(state.events[eventIndex].participants || []),
              participant,
            ],
          };
        }
        state.isLoading = false;
      })

      .addCase(addParticipant.rejected, (state, { error }) => {
        state.isLoading = false;
        state.error = error.message;
      });
  },
});

export const eventsReducer = eventsSlice.reducer;
