import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes } from "./components";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkUser } from "./store/slices/generalSlice";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) dispatch(checkUser());
  }, []);

  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
