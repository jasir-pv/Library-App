import { Select, MenuItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../../actions/books.js';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { mobile } from '../../responsive.js';

// Styled components
const Wrapper = styled.div`
    width: 170px;
    height: 250px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: rgb(250, 251, 252);
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
  

  @media (max-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
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
 
  width: 100%;
  padding: 0 5px;

  
`
const BookTitile = styled.h3`

  
  ${mobile({ 
    fontWeight: '600',
    fontSize: '12px'
  })}
`;

const AuthorName = styled.p`
    font-family: sans-serif;
    font-size: 11;
    margin-top: 5;

     ${mobile({ fontSize: '11px' })}
`

const Available = styled.p`
    font-family: sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: ${(props) => (props.isAvailable ? "green" : "red")};


     ${mobile({ fontSize: '11px' })}
`

const Title = styled.h2`
  font-size: 28px;
  color: #2c3e50;
  margin: 0;
  
  ${mobile({ fontSize: '22px' })}
`;



const FilterContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-left: 0px; /* adjust as needed */
`;

function BooksMobView() {
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10px' }}>
      {/* Header with title and more button */}
      <HeaderContainer>
        <Title>All Books</Title>
       
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
              style={{ maxWidth: 250, height: 150, objectFit: "cover" }}
              alt="Book cover"
            />
            <div style={{ padding: 2 }}>
              <BookTitile>{book.title}</BookTitile>
              <AuthorName >
                {book.author}
              </AuthorName>
              <Available
               isAvailable={book.isAvailable}
              >
                {book.isAvailable ? "Available" : "Checked Out"}
              </Available>
            </div>
          </Wrapper>
        ))}
      </BooksContainer>
    </div>
  );
}

export default BooksMobView;