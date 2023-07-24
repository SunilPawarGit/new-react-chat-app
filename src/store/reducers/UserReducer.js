const initialState = {
  user: "",
  room: "",
  password: "",
  isGlobalError: false,
  messageNotification: "",
  messageType: "success",
};
export const SET_GLOBAL_ERROR = "SET_GLOBAL_ERROR";
export const SET_MESSAGE_NOTIFY = "SET_MESSAGE_NOTIFY";
export const SET_MESSAGE_TYPE = "SET_MESSAGE_TYPE";
export const SET_JOIN_DET = "SET_JOIN_DET";
export const CLEAR_JOIN_DET = "CLEAR_JOIN_DET";
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return { ...state, notes: action.payload };
    case SET_GLOBAL_ERROR:
      return { ...state, isGlobalError: action.payload };
    case SET_MESSAGE_NOTIFY:
      return { ...state, messageNotification: action.payload };
    case SET_MESSAGE_TYPE:
      return { ...state, messageType: action.payload };
    case SET_JOIN_DET:
      return {
        ...state,
        user: action.payload.user,
        room: action.payload.room,
        password: action.payload.password,
      };
    case CLEAR_JOIN_DET:
      return {
        ...state,
        user: "",
        room: "",
        password: "",
      };

    default:
      return state;
  }
};
export default UserReducer;
