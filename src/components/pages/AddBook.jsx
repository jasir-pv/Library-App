import React, { useState } from 'react';
import { TextField, Button, MenuItem, Typography, Box, Select } from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';
import { createBook } from '../../actions/books';
import Navbar from '../Navbar';
import { useNavigate } from 'react-router-dom';


function AddBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    category: 'All',  // Default category
    availability: 'Available',  // Default availability
    selectedFile: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBook(bookData));
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 400,
          mx: 'auto',
          mt: 4,
          p: 3,
          border: '1px solid #ddd',
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" align="center">
          Add Book
        </Typography>

        <TextField
          label="Book Name"
          name="title"
          value={bookData.title}
          onChange={handleChange}
          fullWidth
        />

        <TextField
          label="Author"
          name="author"
          value={bookData.author}
          onChange={handleChange}
          fullWidth
        />

        <Select
          label="Category"
          name="category"
          value={bookData.category}
          onChange={handleChange}
          fullWidth
        >
          <MenuItem value="All">All Categories</MenuItem>
          <MenuItem value="Fiction">Fiction</MenuItem>
          <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
          <MenuItem value="Science">Science</MenuItem>
          <MenuItem value="Novel">Novel</MenuItem>
          <MenuItem value="Biography">Biography</MenuItem>
          {/* Add more categories as needed */}
        </Select>

        <TextField
          label="Availability"
          name="availability"
          value={bookData.availability}
          onChange={handleChange}
          select
          fullWidth
        >
          <MenuItem value="Available">Available</MenuItem>
          <MenuItem value="Not Available">Not Available</MenuItem>
        </TextField>

        <div>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) => setBookData({ ...bookData, selectedFile: base64 })}
            sx={{
              width: '97%',
              margin: '20px 0',
            }}
          />
        </div>
     
        <Button
          variant="contained"
          color="primary"
         
          onClick={handleSubmit}
        >      
          Add Book       
        </Button>
      
      </Box>
    </>
  );
}

export default AddBook;
