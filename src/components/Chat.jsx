/* eslint-disable no-unsafe-optional-chaining */
import { InfoOutlined } from "@mui/icons-material";
import { collection, doc, getDoc, orderBy, query } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { db } from "../configs/firebase";
import ChatInput from "./ChatInput";
import Message from "./Message";

const Chat = () => {
  const chatRef = useRef(null);
  const channelId = useSelector(({ generalSlice }) => generalSlice.channelId);
  const [channelDetails, loading, error] = useDocument(
    channelId ? doc(db, "channels", channelId) : null
  );
  const messagesCollectionRef = channelId
    ? collection(db, "channels", channelId, "messages")
    : null;
  const messagesQuery = messagesCollectionRef
    ? query(messagesCollectionRef, orderBy("createdAt", "asc"))
    : null;
  const [channelMessages, loadingMessages, errorMes] =
    useCollection(messagesQuery);
  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [channelId, loadingMessages]);

  return (
    <ChatContainer>
      {channelDetails && channelMessages && (
        <>
          <ChatHeader>
            <ChatHeaderLeft>
              <h4>
                <strong>{`# ${channelDetails?.data()?.name}`}</strong>
              </h4>
            </ChatHeaderLeft>
            <ChatHeaderRight>
              <p>
                <InfoOutlined /> Details
              </p>
            </ChatHeaderRight>
          </ChatHeader>

          <ChatMessages>
            {channelMessages?.docs?.map((doc) => {
              const { message, createdAt, user } = doc?.data();
              console.log('user in message',user)
              return (
                <Message
                  key={doc?.id}
                  message={message}
                  createdAt={createdAt}
                  user={user}
                />
              );
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            chatRef={chatRef}
            channelName={channelDetails?.data()?.name}
            channelId={channelId}
          />
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;

const ChatBottom = styled.div`
  padding-bottom: 100px;
`;
const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;
const ChatHeaderLeft = styled.div`
  display: flex;
  align-items: center;

  > h4 {
    display: flex;
    text-transform: lowercase;
  }
`;
const ChatHeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;
const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 60px;
`;
const ChatMessages = styled.div``;
