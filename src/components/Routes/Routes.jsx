/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router";
import styled from "styled-components";
import Chat from "../Chat";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../Login";
import { auth } from "../../configs/firebase";
const RoutesComp = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <>
      {!user ? (
        <Login />
      ) : (
        <>
          <Header />
          <AppBody>
            <Sidebar />
            <Routes>
              <Route path="/" exact element={<Chat />} />
            </Routes>
          </AppBody>
        </>
      )}
    </>
  );
};

export default RoutesComp;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
