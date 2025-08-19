import { Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../actions/books.js';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { mobile } from '../responsive';

// Styled components
const Wrapper = styled.div`
    width: 250px;
    height: 320px;
    cursor: pointer;
    background-color: rgb(250, 251, 252);
    padding-top: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.2);
    
    &:hover {
      background-color: rgb(194, 229, 255);
      transform: scale(1.03);
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.4);
    }
`;

const BooksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap:16px;
  min-height: 60vh;

  @media (max-width: 768px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    justify-content: flex-start;
    padding: 10px;
    gap: 12px;
    -ms-overflow-style: none;
    scrollbar-width: none;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 20px;
  margin-bottom: 20px;
  
  ${mobile({ 
    padding: '0 10px',
    marginBottom: '15px'
  })}
`;

const Title = styled.h2`
  font-size: 28px;
  color: #2c3e50;
  margin: 0;
  
  ${mobile({ fontSize: '22px' })}
`;

const MoreButton = styled.button`
  background: linear-gradient(135deg, #3498db, #2c3e50);
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(52, 152, 219, 0.3);
  }
  
  ${mobile({ 
    padding: '6px 12px',
    fontSize: '12px'
  })}
`;

const FilterContainer = styled.div`
  margin-bottom: 20px;
  
  ${mobile({ display: 'none' })}
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

  const handleMoreClick = () => {
    // Navigate to a page with all books or perform another action
    navigate('/all-books');
  };
 
  const filteredBooks = selectedCategory === 'All'
    ? books
    : books.filter((book) => book.category === selectedCategory);
    
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
      {/* Header with title and more button */}
      <HeaderContainer>
        <Title>Books</Title>
        <MoreButton onClick={handleMoreClick}>More</MoreButton>
      </HeaderContainer>

      {/* Category filter - hidden on mobile */}
      <FilterContainer>
        <Select
          sx={{
            border: 'none',
            outline: 'none',
            '& fieldset': { border: 'none' },
            '&:focus-visible': { outline: 'none' }
          }}
          value={selectedCategory} 
          onChange={handleCategoryChange}
        >
          <MenuItem value="All">All Categories</MenuItem>
          <MenuItem value="Fiction">Fiction</MenuItem>
          <MenuItem value="Non-Fiction">Non-Fiction</MenuItem>
          <MenuItem value="Science">Science</MenuItem>
          <MenuItem value="Novel">Novel</MenuItem>
          <MenuItem value="Biography">Biography</MenuItem>
        </Select>
      </FilterContainer>

      <BooksContainer>
        {filteredBooks.map((book) => (
          <Wrapper
            key={book._id || book.id}
            onClick={() => handleBookClick(book._id || book.id)}
           
          >
            <img
              src={book.selectedFile}
              style={{ maxWidth: 250, height: 220, objectFit: "cover" }}
              alt="Book cover"
            />
            <div style={{ padding: 2 }}>
              <h4>{book.title}</h4>
              <p style={{ fontFamily: "sans-serif", fontSize: 13, marginTop: 5 }}>
                {book.author}
              </p>
              <p
                style={{
                  color: book.isAvailable ? "green" : "red",
                  fontWeight: "500",
                }}
              >
                {book.isAvailable ? "Available" : "Checked Out"}
              </p>
            </div>
          </Wrapper>
        ))}
      </BooksContainer>
    </div>
  );
}

export default Books;