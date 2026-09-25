import { Route, Routes } from "react-router-dom";
import EventDetails from "./EventDetails";
import EventsList from "./EventsList";

const Events = () => {
  return (
    <Routes>
      <Route index element={<EventsList />} />
      <Route path="going" element={<EventsList onlyGoing />} />
      <Route path=":id" element={<EventDetails />} />
    </Routes>
  );
};

export default Events;
