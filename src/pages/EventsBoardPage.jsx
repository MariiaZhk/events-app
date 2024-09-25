import { Pagination } from "@mui/material";
import EventsList from "../components/EventsList";

export default function EventsBoardPage() {
  return (
    <>
      <EventsList />
      <Pagination color="primary"></Pagination>
    </>
  );
}
