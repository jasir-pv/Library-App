


// const authReducers = (state = { authData: null }, action) => {
//     switch (action.type) {
//       case "AUTH":
//         localStorage.setItem("profile", JSON.stringify(action.payload));
//         return { ...state, authData: action.payload };
//         case "LOGOUT":
//           localStorage.clear();
//           return {...state, authData:null};
//       default:
//         return state;
//     }
//   };
  
//   export default authReducers;
  

import axios from "axios";

const BASE_URL = "http://localhost:5000/";

// Example of getting TOKEN dynamically
const getToken = () => {
  return localStorage.getItem("token");
};

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${getToken()}` },
});



const initialState = {
    user: null,
    isFetching: false,
    error: false,
  };
  
//   const authReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'LOGIN_START':
//         return { ...state, isFetching: true, error: false };
//       case 'LOGIN_SUCCESS':
//         return { ...state, user: action.payload, isFetching: false };
//       case 'LOGIN_FAILURE':
//         return { ...state, isFetching: false, error: true };
//       default:
//         return state;
//     }
//   };

const authReducer = (state = { user: null, isFetching: false, error: false }, action) => {
    switch (action.type) {
      case 'LOGIN_SUCCESS':
      case 'SIGNUP_SUCCESS':
        return { ...state, user: action.payload, isFetching: false, error: false };
      case 'LOGOUT':
        localStorage.clear();
        return { ...state, user: null };
      default:
        return state;
    }
  };
  
  
  export default authReducer; // Make sure this is exported as default
  