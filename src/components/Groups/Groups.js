import { Route, Routes } from "react-router-dom";
import GroupDetails from "./GroupDetails";
import GroupsList from "./GroupsList";

const Groups = () => {
  return (
    <Routes>
      <Route index element={<GroupsList />} />
      <Route path="mine" element={<GroupsList onlyJoined />} />
      <Route path=":id" element={<GroupDetails />} />
    </Routes>
  );
};

export default Groups;
