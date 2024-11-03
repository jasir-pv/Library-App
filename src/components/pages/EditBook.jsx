import React, {  useEffect, useState } from 'react';
import { TextField, Button, MenuItem, Typography, Box } from '@mui/material';
import FileBase from 'react-file-base64';
import { useDispatch } from 'react-redux';

import { createBook, updateBook } from '../../actions/books';


function EditBook({book, setIsEditing}) {
    const dispatch = useDispatch()
  const [bookData, setBookData] = useState({
    title: '',
    author: '',
    category: '',
    availability: '',
    image: null,
  });

  useEffect(() => {
    if (book) {
      setBookData(book);
    }
  }, [book]);



  const handleChange = (e) => {
    
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleImageChange = (e) => {
    setBookData({ ...bookData, img: e.target.files[0] });
  };


  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(updateBook(book._id,bookData))
    setIsEditing(false);
  };

  return (
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
        Edit Book
      </Typography>

      <TextField
        label="Book Name"
        name="title"
        value={bookData.title}
        onChange={handleChange}
        fullWidth
      />
    console.log(value)
      <TextField
        label="Author"
        name="author"
        value={bookData.author}
        onChange={handleChange}
        fullWidth
      />

      <TextField
        label="Category"
        name="category"
        value={bookData.category}
        onChange={handleChange}
        fullWidth
      />


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
            type= "file"
            multiple={false}
            onChange={handleImageChange}
            onDone={( {base64})=> setBookData({...bookData,selectedFile:base64})}
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
       Update
      </Button>
    </Box>
  );
}

export default EditBook;
