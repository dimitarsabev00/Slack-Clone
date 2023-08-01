import {
  Add,
  Apps,
  BookmarkBorder,
  Create,
  ExpandLess,
  ExpandMore,
  FileCopy,
  Inbox,
  InsertComment,
  PeopleAlt,
  QuestionAnswer,
  Send,
} from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import SidebarOption from "./SidebarOption";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../configs/firebase";
const Sidebar = () => {
  const [channels, loading, error] = useCollection(collection(db, "rooms"));
  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <span>Slack</span>
        </SidebarInfo>
        <Create />
      </SidebarHeader>
      <SidebarOption Icon={InsertComment} title={"Threads"} />
      <SidebarOption Icon={BookmarkBorder} title={"Later"} />
      <SidebarOption Icon={QuestionAnswer} title={"Direct messages"} />
      <SidebarOption Icon={Inbox} title={"Mentions & reactions"} />
      <SidebarOption Icon={Send} title={"Drafts & sent"} />
      <SidebarOption Icon={FileCopy} title={"Files"} />
      <SidebarOption Icon={PeopleAlt} title={"People & user groups"} />
      <SidebarOption Icon={Apps} title={"Apps"} />
      <SidebarOption Icon={ExpandLess} title={"Show less"} />
      <hr />
      <SidebarOption Icon={ExpandMore} title={"Channels"} />
      <hr />
      <SidebarOption Icon={Add} addChannelOption title={"Add channels"} />
      {channels?.docs?.map((doc) => (
        <SidebarOption key={doc?.id} title={doc?.data()?.name} />
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  color: white;
  background-color: var(--sideBar-slack-background-color);
  flex: 0.2;
  border-top: 1px solid #2a2b30;
  max-width: 260px;
  margin-top: 60px;

  > hr {
    margin-top: 10px;
    margin-bottom: 10px;
    border: 1px solid #2a2b30;
  }
`;
const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #2a2b30;
  padding: 13px;
  > .MuiSvgIcon-root {
    padding: 8px;
    color: #18171c;
    font-size: 18px;
    background-color: white;
    border-radius: 999px;
  }
`;
const SidebarInfo = styled.div`
  flex: 1;
  > span {
    font-size: 18px;
    font-weight: 900;
    margin-bottom: 5px;
  }
`;
