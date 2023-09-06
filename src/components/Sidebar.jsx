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
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SidebarOption from "./SidebarOption";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../configs/firebase";
import { useDispatch } from "react-redux";
import { enterRoom } from "../store/slices/generalSlice";
const Sidebar = () => {
  const dispatch = useDispatch();
  const [showChannels, setShowChannels] = useState(true);
  const [channels, loading, error] = useCollection(collection(db, "channels"));
  useEffect(() => {
    if (channels?.docs.length > 0) {
      dispatch(enterRoom({ channelId: channels?.docs?.[0]?.id }));
    }
  }, [channels?.docs]);

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
      <SidebarOption
        Icon={showChannels ? ExpandMore : ExpandLess}
        title={"Channels"}
        setShowChannels={() => {
          setShowChannels((prev) => !prev);
        }}
      />
      {showChannels && (
        <>
          <hr />
          {channels?.docs?.map((doc) => (
            <SidebarOption
              key={doc?.id}
              id={doc?.id}
              title={doc?.data()?.name}
            />
          ))}
        </>
      )}

      <SidebarOption Icon={Add} addChannelOption title={"Add channels"} />
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
