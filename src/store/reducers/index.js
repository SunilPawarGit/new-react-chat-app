import { persistReducer } from "redux-persist";
import NotesReducer from "./NotesReducer";
import UserReducer from "./UserReducer";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import ChatReducer from "./ChatReducer";

const reducers = combineReducers({
  UserReducer: persistReducer({ key: "auth", storage }, UserReducer),
  NotesReducer: NotesReducer,
  ChatReducer: persistReducer({ key: "chat", storage }, ChatReducer),
});
export default reducers;
