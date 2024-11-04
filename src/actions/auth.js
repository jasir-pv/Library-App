import * as api from "../api/index.js";
import axios from "axios";

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


export const login = async (dispatch, userData) => {
    dispatch({ type: 'LOGIN_START' });
    try {
      const res = await axios.post('http://localhost:5000/auth/login', userData);
    
      dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      localStorage.setItem('user', JSON.stringify(res.data)); // Store token/user data if needed
      
    } catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data.message || 'Login failed' });
    }
  };
  
  // Sign Up Action
  export const signup = async (dispatch, userData) => {
    dispatch({ type: 'SIGNUP_START' });
    try {
      const res = await axios.post('http://localhost:5000/auth/register', userData);
      dispatch({ type: 'SIGNUP_SUCCESS', payload: res.data });
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (err) {
      dispatch({ type: 'SIGNUP_FAILURE', payload: err.response.data.message || 'Signup failed' });
    }
  };