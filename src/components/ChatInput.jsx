/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import moment from "moment";
import { useState } from "react";
import styled from "styled-components";
import { db } from "../configs/firebase";

const ChatInput = ({ channelName, channelId, chatRef }) => {
  const [input, setInput] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();
    if (!channelId) {
      return false;
    }

    addDoc(collection(db, "channels", channelId, "messages"), {
      message: input,
      createdAt: moment().format("DD.MM.YYYY"),
      user: {
        name: "testName",
        avatar: "here url for avatar",
      },
    })
      .then((docRef) => {
        setInput("");
        chatRef?.current?.scrollIntoView({
          behavior: "smooth",
        });
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };
  return (
    <ChatInputContainer>
      <form>
        <input
          placeholder={`Message # ${channelName}`}
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          SEND
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;
const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;
