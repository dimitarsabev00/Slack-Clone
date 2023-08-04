/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router";
import styled from "styled-components";
import Chat from "../Chat";
import Header from "../Header";
import Sidebar from "../Sidebar";

const RoutesComp = () => {
  return (
    <>
      <Header />
      <AppBody>
        <Sidebar />
        <Routes>
          <Route path="/" exact element={<Chat />} />
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
