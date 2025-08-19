import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import Navbar from '../Navbar';
import { checkin, checkout, deleteBook, updateBook } from '../../actions/books';
import EditBook from './EditBook';
import { mobile } from '../../responsive';

const Container = styled.div`
  min-height: 100vh;
  
  ${mobile({ 
    padding: '10px' 
  })}
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  
  ${mobile({ 
    flexDirection: 'column',
    gap: '20px',
    marginTop: '50px'
    
  })}
`;

const Details = styled.div`
  display: flex;
  max-width: 800px;
  margin: 20px 0;
  
  ${mobile({ 
    flexDirection: 'column',
    margin: '10px 0',
    alignItems: 'center'
  })}
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  
  ${mobile({ 
    width: '90%',
    marginBottom: '10px'
  })}
`;

const Image = styled.img`
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  ${mobile({ 
    maxWidth: '250px'
  })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 20px;
  
  ${mobile({ 
    padding: '0 10px',
    textAlign: 'center'
  })}
`;

const Title = styled.h2`
  font-size: 28px;
  margin-bottom: 15px;
  color: #2c3e50;
  
  ${mobile({ 
    fontSize: '24px',
    marginBottom: '2px'
  })}
`;

const InfoText = styled.p`
  font-size: 16px;
  margin-bottom: 12px;
  line-height: 1.5;
  
  ${mobile({ 
    fontSize: '15px',
    marginBottom: '2px'
  })}
`;

const Buttons = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  
  ${mobile({ 
    marginTop: '25px',
    gap: '12px'
  })}
`;

const ActionButton = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  ${mobile({ 
    padding: '10px 15px',
    fontSize: '14px'
  })}
`;

const CheckInOutButton = styled(ActionButton)`
  background-color: ${({ isAvailable }) => (isAvailable ? '#02495C' : '#2c3e50')};
  color: white;
  
  &:hover {
    background-color: ${({ isAvailable }) => (isAvailable ? '#01303e' : '#1a2530')};
  }
`;

const EditButton = styled(ActionButton)`
  background-color: #40e643;
  color: white;
  
  &:hover {
    background-color: #02a810;
  }
`;

const DeleteButton = styled(ActionButton)`
  background-color: #fc3d50;
  color: white;
  
  &:hover {
    background-color: #f70a22;
  }
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 15px;
  
  ${mobile({ 
    gap: '10px'
  })}
  
  ${ActionButton} {
    flex: 1;
  }
`;

const Update = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px 0;
  
  ${mobile({ 
    margin: '10px 0'
  })}
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 18px;
  margin-top: 50px;
`;

function BookDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  if (!book) return <LoadingText>Loading...</LoadingText>;

  const handleEditClick = () => {
    if (user && user.isAdmin) {
      setIsEditing(true);
    } else {
      alert("Only Admins Can Edit the Book");
    }
  };

  const handleDeleteClick = () => {
    if (user && user.isAdmin) {
      if (window.confirm("Are you sure you want to delete this book?")) {
        dispatch(deleteBook(book._id || book.id));
        navigate('/');
      }
    } else {
      alert("Only Admins Can Delete the Book");
    }
  };

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
      {/* <div style={{ display: window.innerWidth <= 768 ? 'none' : 'block' }}> */}
        <Navbar />
      {/* </div> */}
      <Wrapper>
        <Details>
          <ImageContainer>
            <Image
              src={book.selectedFile}
              alt={book.title}
            />
          </ImageContainer>
          
          <InfoContainer>
            <Title>{book.title}</Title>
            <InfoText><strong>Author:</strong> {book.author}</InfoText>
            <InfoText><strong>Category:</strong> {book.category}</InfoText>
            <InfoText>
              <strong>Availability:</strong> 
              <span style={{ color: localAvailability ? 'green' : 'red', marginLeft: '5px' }}>
                {localAvailability ? "Available" : "Checked Out"}
              </span>
            </InfoText>
            <InfoText><strong>Description:</strong> {book.description || 'No description available.'}</InfoText>
            
            <Buttons>
              {user && user.isAdmin && (
                <ButtonRow>
                  <EditButton onClick={handleEditClick}>Edit</EditButton>
                  <DeleteButton onClick={handleDeleteClick}>Delete</DeleteButton>
                </ButtonRow>
              )}
              
              <CheckInOutButton 
                onClick={handleCheckInOut}
                isAvailable={localAvailability}
              >
                {localAvailability ? "Check Out" : "Check In"}
              </CheckInOutButton>
            </Buttons>
          </InfoContainer>
        </Details>
        
        {isEditing && (
          <Update>
            <EditBook book={book} setIsEditing={setIsEditing} />
          </Update>
        )}
      </Wrapper>
    </Container>
  );
}

export default BookDetails;