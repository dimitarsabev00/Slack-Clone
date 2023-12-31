/* eslint-disable react/prop-types */
import { Route, Routes } from "react-router";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Chat from "../Chat";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import Auth from "../Auth";
import { auth } from "../../configs/firebase";
import Spinner from "react-spinkit";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setGeneralFields } from "../../store/slices/generalSlice";
const RoutesComp = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  if (loading) {
    <AppLoading>
      <AppLoadingContents>
        <img
          src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
          alt=""
        />
        <Spinner name="ball-spin-fade-loader" color="purple" fadeIn="none" />
      </AppLoadingContents>
    </AppLoading>;
  }
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setGeneralFields({ user }));
        navigate("/");
      } else {
        dispatch(setGeneralFields({ user: {} }));

        navigate("/auth");
      }
    });
  }, []);

  return (
    <>
      {!user ? (
        <Routes>
          <Route path="/auth" exact element={<Auth />} />
        </Routes>
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

const AppLoading = styled.div`
  text-align: center;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > img {
    height: 100px;
    padding: 20px;
    margin-bottom: 40px;
  }
`;
const AppLoadingContents = styled.div``;
const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
