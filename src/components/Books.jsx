import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MoreHoriz from '@mui/icons-material/MoreHoriz' 
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp';
import { getBooks } from '../actions/books';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
    width:250px;
    height:320px;
    cursor: pointer;
    background-color: #dedcdc;
    padding-top: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    transition: ease 0.3s;
    &:hover{
      background-color: #a69e9d;
      transition: ease 0.3s;
    }

`
 

function Books({book}) {

  const books = useSelector((state)=> state.books)

  const dispatch = useDispatch()
  const navigate = useNavigate();

  useEffect (()=>{
      dispatch(getBooks())
  },[dispatch])

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  return (
    <div style={{display:'flex', width:'100%',height:'100vh',alignItems: 'center',flexWrap: 'wrap', gap:16,justifyContent:'center'  }}>
     {books.map((book)=>(
        <Wrapper key={book._id ||book.id}   onClick={() => handleBookClick(book._id || book.id)}>       
          <img src={book.selectedFile} 
            style={{
           maxWidth:250, height:250,
           }} 
            alt="Img" />

            <h5>{book.title}</h5>
          <p>{book.author}</p>
          <p>{book.category}</p>
            <p>{book.availablity}</p>      
           </Wrapper>
     ))}
    </div>
  )
}

export default Books
