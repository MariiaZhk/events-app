export const selectAllEvents = (state) => state.eventsSlice.events;
export const selectEventById = (state, eventId) =>
  state.eventsSlice.events.find((event) => event._id === eventId);
export const selectIsLoading = (state) => state.eventsSlice.isLoading;
export const selectError = (state) => state.eventsSlice.error;
export const selectParticipantsByEventId = (state, eventId) => {
  const event = selectEventById(state, eventId);
  return event ? event.participants : [];
};
