


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


// const BASE_URL = "http://localhost:5000/";

// // Example of getting TOKEN dynamically
// const getToken = () => {
//   return localStorage.getItem("token");
// };

// export const userRequest = axios.create({
//   baseURL: BASE_URL,
//   headers: { token: `Bearer ${getToken()}` },
// });



// const initialState = {
//     user: null,
//     isFetching: false,
//     error: false,
//     accessToken: null,
//   };


// export const authReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'LOGIN_REQUEST':
//       return { ...state, loading: true, error: null };
//     case 'LOGIN_SUCCESS':
//       return { ...state, loading: false, user: action.payload.user, accessToken: action.payload.accessToken };
//     case 'LOGIN_FAILURE':
//       return { ...state, loading: false, error: action.payload }; // Update error state
//     case 'LOGOUT':
//       return initialState;
//     default:
//       return state;
//   }
// };
  
  
//   export default authReducer;
  
// ------------------------------------------------


// reducers/authReducer.js
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT,
} from "../actions/types";

const initialState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        user: action.payload.user, 
        accessToken: action.payload.accessToken, 
        error: null 
      };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case SIGNUP_SUCCESS:
      return { ...state, loading: false, error: null }; // You can add a flag to show successful signup if needed
    case SIGNUP_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
