// import logo from './logo.svg';
// import DeviceDetector from "device-detector-js";
import "./App.css";
import { Alert, Grid, Snackbar } from "@mui/material";
// import axios from "axios";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Join from "./components/Join";
import Chat from "./components/Chat";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_GLOBAL_ERROR,
  SET_MESSAGE_NOTIFY,
  SET_MESSAGE_TYPE,
} from "./store/reducers/UserReducer";

function App() {
  // const [room, setRoom] = useState("");
  const {
    isGlobalError,
    messageNotification,
    messageType,
    user,
    room,
    password,
  } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ type: SET_GLOBAL_ERROR, payload: false });
    dispatch({ type: SET_MESSAGE_NOTIFY, payload: "" });
    dispatch({ type: SET_MESSAGE_TYPE, payload: "success" });
  };

  return (
    <Grid container direction={"row"} sx={{ height: `calc(100vh - 0px)` }}>
      {isGlobalError ? (
        <Snackbar
          open={isGlobalError}
          autoHideDuration={6000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleClose}
            severity={messageType}
            sx={{ width: "100%" }}
          >
            {messageNotification}
          </Alert>
        </Snackbar>
      ) : null}
      <Router>
        <Routes>
          <Route path="/" exact element={<Join />} />
          <Route
            path="/chat"
            exact
            element={<Chat room={room} user={user} password={password} />}
          />
        </Routes>
      </Router>
    </Grid>
  );
}

export default App;
