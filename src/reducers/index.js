import {combineReducers} from "redux"


import authReducers from "./auth.js"
import userReducer from "./user.js";
import books from "./books.js"  
import  searchReducer   from "./search.js";




export default combineReducers({ books,auth:authReducers,search:searchReducer, user:userReducer })