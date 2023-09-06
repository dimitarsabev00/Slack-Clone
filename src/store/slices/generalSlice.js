import { createSlice } from "@reduxjs/toolkit";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../configs/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { toast } from "react-toastify";
import uuid from "react-uuid";

const initialState = {
  channelId: null,
  user: {},
};

export const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    setGeneralFields: (state, { payload }) => ({ ...state, ...payload }),
    enterRoom: (state, action) => {
      state.channelId = action.payload.channelId;
    },
  },
});

export const { setGeneralFields, enterRoom } = generalSlice.actions;

export const loginUserWithGoogle =
  ({ onSuccess }) =>
  async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithRedirect(auth, provider);
      window.localStorage.clear();
      localStorage.setItem("token", user?.accessToken);
      localStorage.setItem("currentUserEmail", user?.email);

      const docSnap = await getDoc(doc(db, "users", user?.email));
      if (docSnap.exists() === false) {
        await addDoc(collection(db, "users"), {
          id: uuid(),
          username: user?.displayName,
          email: user?.email,
          avatar: user?.photoURL,
        });
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
      toast.error("Please Check your Credentials");
    }
  };
export const signUpWithEmailAndPassword =
  ({ payload, onSuccess }) =>
  async (dispatch) => {
    try {
      let { user } = await createUserWithEmailAndPassword(
        auth,
        payload?.userState?.email,
        payload?.userState?.password
      );
      await updateProfile(user, {
        displayName: payload?.userState.username,
        photoURL: `https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg`,
      });
      await addDoc(collection(db, "users"), {
        username: payload?.userState?.username,
        email: payload?.userState?.email,
        avatar:
          "https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg",
      });
      window.localStorage.clear();
      localStorage.setItem("token", user?.accessToken);
      localStorage.setItem("currentUserEmail", user?.email);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.log(err);
      toast.error("Cannot Created your Account!");
    }
  };
export const signInUserWithEmailAndPassword =
  ({ payload, onSuccess }) =>
  async (dispatch) => {
    try {
      let { user } = await signInWithEmailAndPassword(
        auth,
        payload?.userState?.email,
        payload?.userState?.password
      );
      window.localStorage.clear();
      localStorage.setItem("token", user?.accessToken);
      localStorage.setItem("currentUserEmail", user?.email);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.log(err);
      toast.error("Please Check your Credentials");
    }
  };
export const logout =
  ({ onSuccess }) =>
  async (dispatch) => {
    await signOut(auth);
    window.localStorage.clear();
    dispatch(setGeneralFields({ user: null }));
    if (onSuccess) {
      onSuccess();
    }
  };
export default generalSlice.reducer;
