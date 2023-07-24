import { Box, Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { errorNotification } from "../utils/helper";
// import { socket } from "../socket/socket";
import { useDispatch } from "react-redux";
// import { SET_MESSAGES } from "../store/reducers/ChatReducer";
import { SET_JOIN_DET } from "../store/reducers/UserReducer";
import { socket } from "../socket/socket";
// import { useSelector } from "react-redux";

const Join = () => {
  // const { messages } = useSelector((state) => state.ChatReducer);
  const [user, setUser] = useState({
    room: "",
    user: "",
    password: "",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    setUser({
      password: "",
      room: "",
      user: "",
    });
  }, []);
  let navigate = useNavigate();
  const handleJoinClick = () => {
    if (!user.user) return errorNotification("Enter User.");
    if (!user.room) return errorNotification("Enter Room.");
    if (!user.password) return errorNotification("Enter password.");
    dispatch({
      type: SET_JOIN_DET,
      payload: {
        user: user.user,
        room: user.room,
        password: user.password,
      },
    });
    socket.emit(
      "join",
      { name: user.user, room: user.room, password: user.password },
      (error) => {
        if (error) {
          return errorNotification(error);
        } else {
          navigate("/chat");
        }
      }
    );
  };
  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Box
      flex={1}
      sx={{
        display: "flex !important",
        justifyContent: "center",
        placeItems: "center",
        flexDirection: "column",
        // height: "100%",
        px: 3,
        pt: 3,
        gap: 2,
      }}
    >
      <TextField
        required
        value={user.user}
        id="outlined-required"
        label="User Name"
        name="user"
        onChange={handleChange}
        // defaultValue="Hello World"
        autoFocus
        size="small"
      />
      <TextField
        required
        id="outlined-required"
        value={user.room}
        label="Room"
        name="room"
        onChange={handleChange}
        size="small"

        // defaultValue="Hello World"
      />
      <TextField
        required
        type="password"
        id="outlined-required"
        value={user.password}
        label="Password"
        name="password"
        onChange={handleChange}
        size="small"

        // defaultValue="Hello World"
      />
      <Button
        variant="contained"
        onClick={handleJoinClick}
        color="secondary"
        sx={{ minWidth: "200px" }}
        size="small"
      >
        JOIN
      </Button>
    </Box>
  );
};

export default Join;
