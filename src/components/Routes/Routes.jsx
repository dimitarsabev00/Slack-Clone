/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router";
import styled from "styled-components";
import Header from "../Header";
import Sidebar from "../Sidebar";

const RoutesComp = () => {
  return (
    <>
      <Header />
      <AppBody>
        <Sidebar />
        <Routes>
          <Route path="/" element={<></>} />
          {/* Chat */}
        </Routes>
      </AppBody>
    </>
  );
};

export default RoutesComp;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
