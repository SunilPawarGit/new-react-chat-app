import React from "react";
import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";
// import axios from "axios";
import { useEffect, useRef, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import SendIcon from "@mui/icons-material/Send";
import { socket } from "../socket/socket";
import { useNavigate } from "react-router-dom";
import { errorNotification, formatAMPM } from "../utils/helper";
import { useDispatch, useSelector } from "react-redux";
import { SET_MESSAGES } from "../store/reducers/ChatReducer";
import { CLEAR_JOIN_DET } from "../store/reducers/UserReducer";
const Chat = () => {
  const { messages } = useSelector((state) => state.ChatReducer);
  const { user, room, password } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  let divRef1 = useRef(null);
  let divRef2 = useRef(null);

  // const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typeMessage, setTypeMesg] = useState({ show: false });
  const [deviceDet, setDeviceDet] = useState({
    user1: user?.toLowerCase(),
    user1Val: "",
    user2: "Unknown",
    room: room,
    user2Val: "",
  });

  useEffect(() => {
    divRef2.current?.scrollIntoView({ behavior: "smooth", bottom: 0 });
    // if (res?.user1 === "Sunil") {
    // } else {
    // }
    // console.log("thisssss");
    divRef1.current?.scrollIntoView({ behavior: "smooth", bottom: 0 });
    let tt = setTimeout(() => {
      setTypeMesg({});
    }, 3000);

    return () => {
      clearTimeout(tt);
    };
  }, [messages[room]?.length, JSON.stringify(typeMessage).length]);

  useEffect(() => {
    socket.on("typing", (res) => {
      // console.log(res);
      setTypeMesg({ ...res, show: true });
    });
    socket.on("message", (res) => {
      // console.log(res);
      setTypeMesg({ show: false });

      // setMessages((prev) => [...prev, res]);
      dispatch({
        type: SET_MESSAGES,
        payload: {
          room,
          res,
        },
      });
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
      console.log(users);
    });

    return () => {
      socket.off();
    };
  }, [socket]);
  const handleLeave = () => {
    socket.emit("left");
    // socket.off();
    dispatch({ type: CLEAR_JOIN_DET });
    navigate("/");
  };
  const joinChat = () => {
    socket.emit("join", { name: user, room, password }, (error) => {
      if (error) {
        console.log(error);
        navigate("/");
        return errorNotification(error);
      }
    });
  };
  useEffect(() => {
    joinChat();
    if (!user || !room) navigate("/");
  }, []);
  const sendMessageClick = () => {
    if (deviceDet.user2Val.length) {
      socket.emit("sendMessage", deviceDet.user2Val, () =>
        setDeviceDet((prev) => ({ ...prev, user2Val: "" }))
      );
    }
  };
  return (
    <Box
      flex={1}
      sx={{
        display: "flex !important",
        // justifyContent: "center",
        placeItems: "start",
        flexDirection: "column",
        // height: "100%",
        px: 3,
        pt: 3,
      }}
    >
      <Grid
        sx={{
          width: "100%",
          height: `calc(100vh - 100px)`,
          maxHeight: `calc(100vh - 100px)`,
          overflowY: "scroll",
          "::-webkit-scrollbar": {
            width: "6px",
            height: "6px",
          },
          border: "1px solid #D4DDE2",
          p: 2,
        }}
        ref={divRef2}
        // onScroll={onScroll}
      >
        {messages[room]?.map((message, i) => (
          <div key={i + message.user}>
            {message.user === user ? (
              <Grid
                container
                justifyContent={"end"}
                sx={{ position: "relative", pt: 1 }}
              >
                <Grid
                  sx={{
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 31,
                      right: "-10px",
                      width: 37,
                      height: 20,
                      bgcolor: "black",
                      transform: "translateY(-50%) rotate(-58deg)",
                      zIndex: -1,
                    },
                    maxWidth: "65%",
                    color: "white",
                    background: "black",
                    borderRadius: "8px",
                    p: 1,
                  }}
                >
                  <Grid container gap={1}>
                    <Typography variant="subtitle1" sx={{ color: "grey" }}>
                      You
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: "grey" }}>
                      {message.sentDate !== null
                        ? formatAMPM(message.sentDate)
                        : ""}
                    </Typography>
                  </Grid>

                  {message.text}
                </Grid>
              </Grid>
            ) : message.user === "admin" ? (
              <Grid
                container
                justifyContent={"center"}
                sx={{ position: "relative", pt: 1 }}
              >
                <Grid
                  sx={{
                    // "&:before": {
                    //   content: '""',
                    //   display: "block",
                    //   position: "absolute",
                    //   top: 31,
                    //   right: "-10px",
                    //   width: 37,
                    //   height: 20,
                    //   bgcolor: "black",
                    //   transform: "translateY(-50%) rotate(-58deg)",
                    //   zIndex: -1,
                    // },
                    maxWidth: "100%",
                    color: "black",
                    background: "white",
                    borderRadius: "8px",
                    p: 1,
                  }}
                >
                  {message.text}
                </Grid>
              </Grid>
            ) : (
              <Grid
                container
                justifyContent={"start"}
                sx={{ position: "relative", pt: 1 }}
              >
                <Grid
                  sx={{
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 31,
                      left: "-10px",
                      width: 37,
                      height: 20,
                      bgcolor: "black",
                      transform: "translateY(-50%) rotate(58deg)",
                      zIndex: -1,
                    },
                    maxWidth: "70%",
                    color: "white",
                    background: "black",
                    borderRadius: "8px",
                    p: 1,
                  }}
                >
                  <Grid container gap={1}>
                    <Typography variant="subtitle1" sx={{ color: "grey" }}>
                      {message.user}
                    </Typography>
                    <Typography variant="subtitle1" sx={{ color: "grey" }}>
                      {message.sentDate !== null
                        ? formatAMPM(message.sentDate)
                        : ""}
                    </Typography>
                  </Grid>

                  {message.text}
                </Grid>
              </Grid>
            )}
          </div>
        ))}
        {typeMessage?.show ? (
          <Grid
            container
            justifyContent={"start"}
            sx={{ position: "relative", pt: 1 }}
          >
            <Grid
              sx={{
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 31,
                  left: "-10px",
                  width: 37,
                  height: 20,
                  bgcolor: "black",
                  transform: "translateY(-50%) rotate(58deg)",
                  zIndex: -1,
                },
                maxWidth: "70%",
                color: "white",
                background: "black",
                borderRadius: "8px",
                p: 1,
              }}
            >
              <Typography variant="subtitle1" sx={{ color: "grey" }}>
                {typeMessage?.user}
              </Typography>

              {typeMessage?.text}
            </Grid>
          </Grid>
        ) : (
          <></>
        )}
        <Grid ref={divRef1} sx={{ height: "2px" }}></Grid>
      </Grid>
      <TextField
        fullWidth
        value={deviceDet?.user2Val}
        onChange={(e) => {
          if (e.target.value?.length > 1) {
            socket.emit("typing");
          }

          setDeviceDet((prev) => ({ ...prev, user2Val: e.target.value }));
        }}
        onKeyPress={(e) => {
          if (e.key === "Enter" && e.target.value.length) {
            setTypeMesg({});
            socket.emit("sendMessage", e.target.value, () =>
              setDeviceDet((prev) => ({ ...prev, user2Val: "" }))
            );
          }
        }}
        sx={{
          pb: 1,
        }}
        InputProps={{
          endAdornment: (
            <>
              <IconButton
                variant="text"
                tabIndex={-1}
                size="small"
                onClick={sendMessageClick}
              >
                <SendIcon color="primary" />
              </IconButton>
              <IconButton
                variant="text"
                tabIndex={-1}
                size="small"
                onClick={handleLeave}
              >
                <LogoutIcon color="primary" />
              </IconButton>
            </>
          ),
        }}
      />
    </Box>
  );
};

export default Chat;
