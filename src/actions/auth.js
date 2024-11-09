

// export const signup = (formData, navigate) => async (dispatch) => {
//   try {
//     const { data } = await api.signUp(formData);
//     console.log(data);
//     dispatch({ type: "AUTH", payload: data });

//     navigate("/");
//   } catch (error) {
//     throw new Error(error.response?.data?.message || "An error occurred");
//   }
// };

// export const login =
//   ({ username, password }, navigate) =>
//   async (dispatch) => {
//     try {
//       const { data } = await api.login({ username, password });
//       console.log(data);
//       dispatch({ type: "AUTH", payload:{ result: data.result, token: data.token } });
//       console.log("dispatched");
//       navigate("/");
//     } catch (error) {
//       const message = error.response
//         ? error.response.data.message
//         : "An error occurred. Please try again.";
//       throw new Error(message);
//     }
//   };


// export const login = async (dispatch, userData) => {
//     dispatch({ type: 'LOGIN_START' });
//     try {
//       const res = await axios.post('http://localhost:5000/auth/login', userData);
//       dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
//       localStorage.setItem('user', JSON.stringify(res.data)); // Store token/user data if needed
      
//     } catch (err) {
//       dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data.message || 'Login failed' });
//     }
//   };
  
//   // Sign Up Action
//   export const signup = async (dispatch, userData) => {
//     dispatch({ type: 'SIGNUP_START' });
//     try {
//       const res = await axios.post('http://localhost:5000/auth/register', userData);
//       dispatch({ type: 'SIGNUP_SUCCESS', payload: res.data });
//       localStorage.setItem('user', JSON.stringify(res.data));
//     } catch (err) {
//       dispatch({ type: 'SIGNUP_FAILURE', payload: err.response.data.message || 'Signup failed' });
//     }
//   };



  // actions/authActions.js
import * as api from '../api'; // Assuming api/index.js has your API methods
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, SIGNUP_SUCCESS, SIGNUP_FAILURE } from './types';

// Action to handle login
export const login = (formData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    
    // Call the API to log in
    const { data } = await api.login(formData);
    
    // Store the token in local storage
    localStorage.setItem("token", data.accessToken);
    
    // Dispatch success action with user data
    dispatch({ 
      type: LOGIN_SUCCESS, 
      payload: { user: data.user, accessToken: data.accessToken } 
    });
  } catch (error) {
    dispatch({ 
      type: LOGIN_FAILURE, 
      payload: error.response ? error.response.data.message : "Network Error" 
    });
  }
};

// Action to handle signup
export const signup = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signup(formData);

    dispatch({ 
      type: SIGNUP_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: SIGNUP_FAILURE,
      payload: error.response ? error.response.data.message : "Network Error"
    });
  }
};

// Action to handle logout
export const logout = () => (dispatch) => {
  // Clear token from local storage
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};


