import { Avatar } from "@mui/material";
import { AccessTime, Search, HelpOutline } from "@mui/icons-material";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../configs/firebase";
import { logout } from "../store/slices/generalSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
const Header = () => {
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  return (
    <HeaderContainer>
      <HeaderLeft>
        <AccessTime />
      </HeaderLeft>
      <HeaderSearch>
        <Search />
        <input placeholder="Search.." />
      </HeaderSearch>
      <HeaderRight>
        <HelpOutline />
        <HeaderAvatar
          src={user?.photoURL}
          alt={user?.displayName}
          onClick={() => {
            dispatch(
              logout({
                onSuccess: () => {
                  toast.success("Success Logout!");
                },
              })
            );
          }}
        />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;
const HeaderContainer = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--header-slack-background-color);
  color: #aaabac;
`;
const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  margin-left: 20px;
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;
const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  margin-right: 20px;
  :hover {
    opacity: 0.8;
  }
`;
const HeaderSearch = styled.div`
  flex: 0.4;
  opacity: 1;
  border-radius: 6px;
  background-color: #38373c;
  text-align: center;
  display: flex;
  padding: 0 50px;
  color: #aaabac;
  border: 1px gray solid;
  > input {
    background-color: transparent;
    border: none;
    text-align: center;
    min-width: 30vw;
    outline: 0;
    color: #aaabac;
  }
`;
const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`;
