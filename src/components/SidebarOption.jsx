/* eslint-disable react/prop-types */
import styled from "styled-components";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../configs/firebase";
import { useDispatch, useSelector } from "react-redux";
import { enterRoom } from "../store/slices/generalSlice";
const SidebarOption = ({
  Icon,
  title,
  setShowChannels,
  addChannelOption,
  id,
}) => {
  const dispatch = useDispatch();
  const channelId = useSelector(({ generalSlice }) => generalSlice.channelId);

  const addChannel = async () => {
    const channelName = prompt("Please enter the channel name");

    if (channelName) {
      const { id } = await addDoc(collection(db, "channels"), {
        name: channelName,
      });
      dispatch(enterRoom({ channelId: id }));
    }
  };
  const selectChannel = () => {
    if (id) {
      dispatch(enterRoom({ channelId: id }));
    }
  };

  return (
    <SidebarOptionContainer
      onClick={
        addChannelOption
          ? addChannel
          : setShowChannels
          ? setShowChannels
          : selectChannel
      }
      style={{ backgroundColor: `${id === channelId ? "#343636" : "#18181C"}` }}
    >
      {Icon && (
        <Icon
          fontSize="small"
          style={{
            padding: 10,
          }}
        />
      )}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span>
          {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
};

export default SidebarOption;
const SidebarOptionContainer = styled.div`
  display: flex;
  font-size: 12px;
  align-items: center;
  padding-left: 2px;
  cursor: pointer;
  :hover {
    opacity: 0.9;
    background-color: #343636;
  }

  > h3 {
    font-weight: 500;
  }
  > h3 > span {
    padding: 15px;
  }
`;
const SidebarOptionChannel = styled.h3`
  padding: 10px 0;
  font-weight: 300;
`;
