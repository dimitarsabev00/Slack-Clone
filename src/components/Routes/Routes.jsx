/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router";
import Header from "../Header";

const RoutesComp = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />} />
    </Routes>
  );
};

export default RoutesComp;
