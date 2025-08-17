import { Select, MenuItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../actions/books.js';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const Wrapper = styled.div`
    width: 250px;
    height: 320px;
    cursor: pointer;
    background-color: #dedcdc;
    padding-top: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
     box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.2);
    &:hover {
      background-color: #a69e9d;
      transform: scale(1.03); /* Slight zoom-in on hover */
       box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.4); /* Darker shadow on hover */
    }
`;

function Books() {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

 
  const filteredBooks = selectedCategory === 'All'
    ? books
    : books.filter((book) => book.category === selectedCategory);
    
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

      <div style={{ marginBottom: 20,}}>
        <Select
            sx={{
    border: 'none',
    outline: 'none',
    '& fieldset': { border: 'none' }, // Removes the default border around the dropdown
    '&:focus-visible': { outline: 'none' } // Removes focus outline
  }}
         value={selectedCategory} onChange={handleCategoryChange}>
          <MenuItem value="All">All Categories</MenuItem>
          <MenuItem value="Fiction">Fiction</MenuItem>
          <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
          <MenuItem value="Science">Science</MenuItem>
          <MenuItem value="Novel">Novel</MenuItem>
          <MenuItem value="Biography">Biography</MenuItem>
         
        </Select>
      </div>

      <div style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 16,
        justifyContent: 'center',
      }}>
        {filteredBooks.map((book) => (
          <Wrapper key={book._id || book.id} onClick={() => handleBookClick(book._id || book.id)}>
            <img src={book.selectedFile} 
              style={{ maxWidth: 250, height: 250 }}
              alt="Img" />
            <h4>{book.title}</h4>
            <p style={{ fontFamily: 'sans-serif', fontSize: 13, marginTop: 5 }}>
              {book.author}
            </p>
            
            <p>{book.isAvailable ? "Available" : "Checked Out"}</p>      
          </Wrapper>
        ))}
      </div>
    </div>
  );
}

export default Books;
