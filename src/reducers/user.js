

// const userReducer = (state = { users: [] }, action) => {
//     switch (action.type) {
//       case "FETCH_USERS": {
//         return { ...state, users: action.payload };
//       }
//       case "DELETE_USER": {
//         return {
//           ...state,
//           users: state.users.filter((user) => user._id !== action.payload),
//         };
//       }
//       default:
//         return state;
//     }
//   };
  
//   export default userReducer;

// reducers/userReducer.js
// const initialState = {
//     currentUser: null,
//     isFetching: false,
//     error: false,
//   };
  
//   const userReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case 'LOGIN_START':
//         return { ...state, isFetching: true, error: false };
//       case 'LOGIN_SUCCESS':
//         return { ...state, currentUser: action.payload, isFetching: false };
//       case 'LOGIN_FAILURE':
//         return { ...state, isFetching: false, error: true };
//       default:
//         return state;
//     }
//   };
  
//   export default userReducer;

const initialState = {
    user: null,
    isFetching: false,
    error: false,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOGIN_START':
      case 'SIGNUP_START':
        return { ...state, isFetching: true, error: false };
      case 'LOGIN_SUCCESS':
      case 'SIGNUP_SUCCESS':
        return { ...state, user: action.payload, isFetching: false, error: false };
      case 'LOGIN_FAILURE':
      case 'SIGNUP_FAILURE':
        return { ...state, isFetching: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default userReducer;
  
  