/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router";

const RoutesComp = () => {
  return (
    <Routes>
      <Route path="/" element={<h1>This is home page</h1>} />
    </Routes>
  );
};

export default RoutesComp;
