


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

// const BASE_URL = "http://localhost:5000/";

// // Example of getting TOKEN dynamically
// const getToken = () => {
//   return localStorage.getItem("token");
// };

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: { token: `Bearer ${getToken()}` },
// });



const initialState = {
    user: null,
    isFetching: false,
    error: false,
    accessToken: null,
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

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, user: action.payload.user, accessToken: action.payload.accessToken };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: action.payload }; // Update error state
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
};
  
  
  export default authReducer; // Make sure this is exported as default
  