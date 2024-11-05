// src/actions/userActions.js
import * as api from '../api'; // Ensure this points to your API functions
import { FETCH_USERS, DELETE_USER, EDIT_USER, USERS_ERROR } from './types';

// Fetch users action
export const fetchUsers = () => async (dispatch) => {
  try {
    const { data } = await api.fetchUsers();
    dispatch({ type: FETCH_USERS, payload: data });
  } catch (error) {
    dispatch({ type: USERS_ERROR, payload: error.message });
  }
};

// Delete user action
export const deleteUser = (id) => async (dispatch) => {
  try {
    await api.deleteUser(id);
    dispatch({ type: DELETE_USER, payload: id });
  } catch (error) {
    dispatch({ type: USERS_ERROR, payload: error.message });
  }
};

// Edit user action
export const editUser = (id, updatedUser) => async (dispatch) => {
  try {
    const { data } = await api.editUser(id, updatedUser);
    dispatch({ type: EDIT_USER, payload: data });
  } catch (error) {
    dispatch({ type: USERS_ERROR, payload: error.message });
  }
};
