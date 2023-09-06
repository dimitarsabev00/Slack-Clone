import { Button, Input, TextField } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import styled from "styled-components";
import { auth } from "../configs/firebase";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  loginUserWithGoogle,
  signInUserWithEmailAndPassword,
  signUpWithEmailAndPassword,
} from "../store/slices/generalSlice";

const Auth = () => {
  const [userState, setUserState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorState, setErrorState] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [authState, setAuthState] = useState("login");
  const dispatch = useDispatch();

  const checkPassword = () => {
    if (userState?.password?.length < 8) {
      setErrorState((error) =>
        error.concat({ message: "Password length should be greater than 8" })
      );
      return false;
    } else if (userState?.password !== userState?.confirmPassword) {
      setErrorState((error) =>
        error.concat({
          message: "Password and Confirm Password does not match",
        })
      );
      return false;
    }
    return true;
  };

  return (
    <Container>
      {authState === "login" ? (
        <InnerContainer>
          <img
            src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
            alt=""
          />
          <h1>Sign in to Slack</h1>
          <p>We suggest using the email address you use at work.</p>
          <Button
            onClick={() => {
              dispatch(
                loginUserWithGoogle({
                  onSuccess: () => {
                    toast.success("Success Login With Google!");
                  },
                })
              );
            }}
          >
            Sign in With Google
          </Button>
          <OrContainer>
            <OrLine />
            <OrText>OR</OrText>
            <OrLine />
          </OrContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "1rem",
            }}
          >
            <TextField
              label="Email"
              variant="standard"
              value={userState?.email}
              onChange={(e) => {
                setUserState((prev) => ({ ...prev, email: e.target.value }));
              }}
            />
            <TextField
              label="Password"
              variant="standard"
              style={{ marginTop: "1rem" }}
              value={userState?.password}
              onChange={(e) => {
                setUserState((prev) => ({ ...prev, password: e.target.value }));
              }}
              type="password"
            />
          </div>
          <ButtonsContainer>
            <Button
              onClick={() => {
                dispatch(
                  signInUserWithEmailAndPassword({
                    payload: {
                      userState,
                    },
                    onSuccess: () => {
                      toast.success("Success Login!");
                    },
                  })
                );
              }}
              className="signInWithEmail"
            >
              Sign In With Email
            </Button>
            <p>
              New to Slack?{" "}
              <span
                style={{ color: "#1976d2", cursor: "pointer" }}
                onClick={() => {
                  setAuthState("register");
                }}
              >
                Create an account
              </span>
            </p>
          </ButtonsContainer>
        </InnerContainer>
      ) : (
        <InnerContainer>
          <img
            src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
            alt=""
          />
          <h1>Sign Up</h1>
          <p>We suggest using the email address you use at work.</p>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: "1rem",
            }}
          >
            <TextField
              label="Username"
              variant="standard"
              onChange={(e) => {
                setUserState((prev) => ({ ...prev, username: e.target.value }));
              }}
              value={userState?.username}
            />
            <TextField
              label="Email"
              variant="standard"
              style={{ marginTop: "1rem" }}
              onChange={(e) => {
                setUserState((prev) => ({ ...prev, email: e.target.value }));
              }}
              value={userState?.email}
            />
            <TextField
              label="Password"
              variant="standard"
              style={{ marginTop: "1rem" }}
              onChange={(e) => {
                setUserState((prev) => ({ ...prev, password: e.target.value }));
              }}
              value={userState?.password}
              type="password"
            />
            <TextField
              label="Confirm Password"
              variant="standard"
              style={{ marginTop: "1rem" }}
              onChange={(e) => {
                setUserState((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }));
              }}
              value={userState?.confirmPassword}
              type="password"
            />
          </div>
          <ButtonsContainer>
            <Button
              onClick={() => {
                dispatch(
                  signUpWithEmailAndPassword({
                    payload: {
                      userState,
                    },
                    onSuccess: () => {
                      toast.success("Account Created!");
                    },
                  })
                );
              }}
              className="signInWithEmail"
            >
              Sign Up
            </Button>
            <OrContainer>
              <OrLine />
              <OrText>OR</OrText>
              <OrLine />
            </OrContainer>
            <Button
              onClick={() => {
                dispatch(
                  loginUserWithGoogle({
                    onSuccess: () => {
                      toast.success("Success Login With Google!");
                    },
                  })
                );
              }}
              style={{
                marginTop: "10px",
                textTransform: "none",
                backgroundColor: "white !important",
                border: "2px solid gray",
                color: "black",
                width: "100%",
              }}
            >
              Continue With Google
            </Button>

            <p>
              Already using Slack?{" "}
              <span
                style={{ color: "#1976d2", cursor: "pointer" }}
                onClick={() => {
                  setAuthState("login");
                }}
              >
                Sign in to Slack
              </span>
            </p>
          </ButtonsContainer>
        </InnerContainer>
      )}
    </Container>
  );
};

export default Auth;
const Container = styled.div`
  background-color: #f8f8f8;
  height: 100vh;
  display: flex;
  justify-content: center;
`;
const InnerContainer = styled.div`
  margin: 20px 0px;
  padding: 100px;
  text-align: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  > img {
    object-fit: contain;
    height: 100px;
    margin-bottom: 40px;
  }
  > button {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: white !important;
    border: 2px solid gray;
    color: black;
    width: 100%;
    &:hover {
      background-color: #fff;
      box-shadow: 0 1px 4px #0000004d;
    }
  }
`;
const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  > .signInWithEmail {
    margin-top: 50px;
    text-transform: inherit !important;
    background-color: #1976d2 !important;
    color: white;
    &:hover {
      background-color: #4986c2 !important;
      box-shadow: 0 1px 4px #0000004d;
    }
  }
`;
const OrContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
`;

const OrLine = styled.div`
  flex-grow: 1;
  height: 1px;
  background-color: #ccc;
`;

const OrText = styled.div`
  margin: 0 20px;
  color: #1d1c1d;
`;
