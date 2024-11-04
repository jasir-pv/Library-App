import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Navbar from '../Navbar';
import { deleteBook, updateBook } from '../../actions/books';
import EditBook from './EditBook';

const Container = styled.div`
  
`
const Wrapper = styled.div`
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;

`
const Details = styled.div`
    padding: 20px;
     display: flex;
    justify-content: 'flex-start';
     max-width: 600px;
    margin: 20px 50px;

`
const ImageContainer = styled.div`
    height: 500px;

    left: 0;
    justify-content: flex-start;
`
const Image = styled.img`
  height: 500px;
`

const InfoContainer = styled.div`
    text-align: left;
    margin-left: 30px;
    margin-top: 30px;

`
const Buttons = styled.div`
      margin-top: 100px;

`
const CheckIn = styled.button`
      padding: 15px 0;
      border: none;
      width: 100%;
     background-color: black;
      color: white;
      font-weight: 600;
      border-radius: 10px;
     cursor: pointer;
     &:hover{
      background-color: #2c2e2c;
      transition: ease 0.3s;
     }
`
const Edit = styled.button`
      padding: 7px;
      border: none;
      width: 45%;
     background-color: #40e643;
      color: white;
      font-weight: 600;
      border-radius: 10px;
     cursor: pointer;
     margin-right: 10%;
     margin-bottom: 10px;
     transition: ease 0.3s;

     &:hover{
      background-color: #02a810;
      transition: ease 0.3s;
     }
`
const Delete = styled.button`
      padding: 7px;
      border: none;
      width: 45%;
     background-color: #fc3d50;
      color: white;
      font-weight: 600;
      border-radius: 10px;
     cursor: pointer;
     transition: ease 0.3s;

     &:hover{
      background-color: #f70a22;
      transition: ease 0.3s;
     }
`

const Update = styled.div`
  margin-right: 50px;
`


function BookDetails() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showAddBook, setShowAddBook] = useState(false);

  const { id } = useParams();
  const book = useSelector((state) =>
    state.books.find((book) => book._id === id || book.id === id)
  );
  const [isEditing, setIsEditing] = useState(false);
  // const [formData, setFormData] = useState({
  //   title: 'book.title',
  //   author: '',
  //   category: '',
  //   availability: '',
  //   selectedFile: ''
  // });

  // Load book data into form when entering edit mode
  // useEffect(() => {
  //   if (book && isEditing) {
  //     setFormData({
  //       title: book.title,
  //       author: book.author,
  //       category: book.category,
  //       availability: book.availability,
  //       selectedFile: book.selectedFile
  //     });
  //   }
  // }, [book, isEditing]);

  // Toggle edit mode and pre-fill form with book data


  // Handle form input changes
  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const user = useSelector((state)=> state.auth.user)

  useEffect(() => {
    if (!book) {
      // Optionally fetch the book if it's not already in the state
    }
  }, [book]);

  if (!book) return <p>Loading...</p>;

  const handleEditClick = () => {
    if (user&& user.isAdmin){
    setIsEditing(true)
  }else{
    alert("Only Admins Can Edit the Book")
  }
    // setShowAddBook((prev) => !prev); // Toggle visibility of AddBook component
  };


  const handleDeleteClick = () =>{
    if (user&& user.isAdmin){
    dispatch(deleteBook(book._id || book.id))
    navigate('/')
  }else{
    alert( "Only Admins Can Delete the Book")
  }
  }
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(updateBook(id, formData));
  //   setIsEditing(false); // Exit edit mode after updating
  // };
  return (
    
    <Container>
    <Navbar/>
    <Wrapper >
    <Details>
    <ImageContainer>
      <Image
        src={book.selectedFile}
        alt={book.title}
        style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }}
      />
      </ImageContainer>
      <InfoContainer>
      <h2>{book.title}</h2>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Category:</strong> {book.category}</p>
      <p><strong>Availability:</strong> {book.availablity}</p>
      <p><strong>Description:</strong> {book.description || 'No description available.'}</p>
      <Buttons>
      <Edit onClick={handleEditClick} >Edit</Edit>
      <Delete  onClick={handleDeleteClick}>Delete</Delete>
      <CheckIn>Check in</CheckIn> 
      </Buttons>
      </InfoContainer>
      </Details>
      {isEditing && (
          <Update>
            <EditBook book={book} setIsEditing={setIsEditing}/>
          </Update>
        )}
    </Wrapper>
   

    </Container>
  );
}

export default BookDetails;
