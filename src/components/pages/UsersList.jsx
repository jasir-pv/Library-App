// src/components/UserPage.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { fetchUsers, deleteUser, editUser } from '../../actions/user';
import Navbar from '../Navbar';

function UserList() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.user.users);
  const [editMode, setEditMode] = useState(false);
  const [editableUser, setEditableUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers()); // Fetch users when component mounts
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEditClick = (user) => {
    setEditMode(true);
    setEditableUser(user);
  };

  const handleSave = () => {
    dispatch(editUser(editableUser._id, editableUser));
    setEditMode(false);
    setEditableUser(null);
  };

  return (
    <>

    <Navbar/>

    <TableContainer component={Paper} style={{marginTop:50, padding:50}}>
      <Table>
        <TableHead>
          <TableRow>
          
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user._id || user.id}>
                
                <TableCell>
                  {editMode && editableUser && editableUser._id === user._id ? (
                    <input
                      type="text"
                      value={editableUser.username}
                      onChange={(e) => setEditableUser({ ...editableUser, username: e.target.value })}
                    />
                  ) : (
                    user.username
                  )}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Button color="primary" onClick={() => handleEditClick(user)}>Edit</Button>
                  <Button color="secondary" onClick={() => handleDelete(user._id || user.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">No users found</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {editMode && (
        <Button color="primary" onClick={handleSave}>Save</Button>
      )}
    </TableContainer>

    </>
  );
}

export default UserList;
