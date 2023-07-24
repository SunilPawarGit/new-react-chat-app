import { store } from "../store/store";
import {
  SET_GLOBAL_ERROR,
  SET_MESSAGE_NOTIFY,
  SET_MESSAGE_TYPE,
} from "../store/reducers/UserReducer";

export const errorNotification = (msg = "") => {
  store.dispatch({ type: SET_MESSAGE_NOTIFY, payload: msg });
  store.dispatch({ type: SET_GLOBAL_ERROR, payload: true });
  store.dispatch({ type: SET_MESSAGE_TYPE, payload: "error" });
  //   return (
  //     <Snackbar autoHideDuration={6000}>
  //       <Alert severity="error" sx={{ width: "100%" }}>
  //         {msg}
  //       </Alert>
  //     </Snackbar>
  //   );
};

export const successNotification = (msg = "") => {
  store.dispatch({ type: SET_MESSAGE_NOTIFY, payload: msg });
  store.dispatch({ type: SET_GLOBAL_ERROR, payload: true });
  store.dispatch({ type: SET_MESSAGE_TYPE, payload: "error" });
};

export const formatAMPM = (d) => {
  let date = new Date(d);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let strTime = hours + ":" + minutes + " " + ampm;
  return strTime;
};
