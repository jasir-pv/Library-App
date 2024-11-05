


//  const initialState = {
//   users: [],
//   loading: false,
//   error: null,
// };

// export const userReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'GET_USERS_SUCCESS':
//       return { ...state, users: action.payload };
//     case 'DELETE_USER_SUCCESS':
//       return { ...state, users: state.users.filter((user) => user.id !== action.payload) };
//     case 'EDIT_USER_SUCCESS':
//       return {
//         ...state,
//         users: state.users.map((user) => (user.id === action.payload.id ? action.payload : user)),
//       };
//     default:
//       return state;
//   }
// };

  
// export default userReducer;



// src/reducers/userReducer.js
import { FETCH_USERS, DELETE_USER, EDIT_USER, USERS_ERROR } from '../actions/types';

const initialState = {
  users: [],
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload, error: null };
    case DELETE_USER:
      return { ...state, users: state.users.filter(user => user._id !== action.payload), error: null };
    case EDIT_USER:
      return {
        ...state,
        users: state.users.map(user => (user._id === action.payload._id ? action.payload : user)),
        error: null,
      };
    case USERS_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;


