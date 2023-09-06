/* eslint-disable react/prop-types */
import styled from "styled-components";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

const Message = ({ message, createdAt, user }) => {
  TimeAgo.addDefaultLocale(en);
  const timeAgo = new TimeAgo("en-US");
  const jsDate = new Date(createdAt.seconds * 1000);
  return (
    <MessageContainer>
      <img src={user?.avatar} alt="" />
      <MessageInfo>
        <h4>
          {user?.username} <span>{timeAgo.format(jsDate)}</span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
};

export default Message;
const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;

  > img {
    height: 50px;
    border-radius: 8px;
  }
`;
const MessageInfo = styled.div`
  padding-left: 10px;

  > h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
`;
