import {combineReducers} from "redux"
import books from "./books.js"
import authReducers from "./auth.js"
import userReducer from "./user.js";

export default combineReducers({ books,auth:authReducers, user:userReducer })