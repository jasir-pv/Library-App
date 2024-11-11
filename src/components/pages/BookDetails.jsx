import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Navbar from '../Navbar';
import { checkin, checkout, deleteBook, updateBook } from '../../actions/books';
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
      background-color: ${({ isAvailable }) => (isAvailable==="true" ? 'black' : '#02495C')};
      transition: background-color 0.3s ease;
      color: white;
      font-weight: 600;
      border-radius: 10px;
     cursor: pointer;
     &:hover{
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

  const { id } = useParams();
  const book = useSelector((state) => state.books.find((book) => book._id === id));
  const user = useSelector((state) => state.auth.user);
  const [localAvailability, setLocalAvailability] = useState(book?.isAvailable);

  const [isEditing, setIsEditing] = useState(false);



  useEffect(() => {
    if (book) {
      setLocalAvailability(book.isAvailable);
    }
  }, [book]);

  if (!book) return <p>Loading...</p>;

  const handleEditClick = () => {
    if (user&& user.isAdmin){
    setIsEditing(true)
  }else{
    alert("Only Admins Can Edit the Book")
  }
  };


  const handleDeleteClick = () =>{
    if (user&& user.isAdmin){
    dispatch(deleteBook(book._id || book.id))
    navigate('/')
  }else{
    alert( "Only Admins Can Delete the Book")
  }
  }


  const handleCheckInOut = async () => {
    if (!user) return alert('Please log in first');
    
    try {
        if (localAvailability) {
            await dispatch(checkout(id, user._id));
            setLocalAvailability(false);
        } else {
            await dispatch(checkin(id, user._id));
            setLocalAvailability(true);
        }
    } catch (error) {
        alert("Failed to change book status.");
    }
};
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
      <p><strong>Availability:</strong> {localAvailability ? "Available" : "Not Available"}</p>
      <p><strong>Description:</strong> {book.description || 'No description available.'}</p>
      <Buttons>
      <Edit onClick={handleEditClick} >Edit</Edit>
      <Delete  onClick={handleDeleteClick}>Delete</Delete>
      <CheckIn onClick={handleCheckInOut}>
              {localAvailability ? "Check Out" : "Check In"}
            </CheckIn>
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
