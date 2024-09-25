import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../configApi.js/api";

export const fetchAllEvents = createAsyncThunk(
  "events/fetchAllEvents",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/events");
      if (response.status !== 200) {
        return thunkAPI.rejectWithValue("Failed to fetch events");
      }
      return response.data.events;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);

export const addParticipant = createAsyncThunk(
  "participants/addParticipant",
  async (participantData, thunkAPI) => {
    try {
      const { eventId, ...participantInfo } = participantData;
      const response = await api.post(
        `/events/${eventId}/registration`,
        participantInfo
      );
      if (response.status !== 201) {
        return thunkAPI.rejectWithValue("Failed to add participant");
      }
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Something went wrong"
      );
    }
  }
);
