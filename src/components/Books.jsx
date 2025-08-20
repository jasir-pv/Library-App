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
  padding: 10px 5px 0 5px;
  margin-bottom: 20px;
  border-radius: 10px;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #ede9fe;
    transform: scale(1.03);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.4);
  }

  ${mobile`
    width: 200px;
    height: 250px;
  `}
`;


const BooksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap :16px;
  

  @media (max-width: 768px) {
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    justify-content: flex-start;
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

  // hide on desktop by default
  display: none;

  ${mobile({ 
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '0 10px',
    marginBottom: '0px',
  })}
`;



const BookImage = styled.img`
  max-width: 250px;
  height: 220px;
  object-fit: cover;

  @media (max-width: 600px) {
    max-width: 250px;
    height: 150px;
  }
`;

const BookTitile = styled.h5`

  font-size: 15px;
  line-height: 18px;
  
  ${mobile({ 
    fontWeight: '600',
    fontSize: '12px'
  })}
`;

const AuthorName = styled.p`
    font-family: sans-serif;
    font-size: 11;
    margin-top: 3px;
    margin-bottom: 2px;

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
  const books = useSelector((state) => state.books || []);
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
    navigate('/all-books-mob');
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
            <BookImage src={book.selectedFile} alt="Book cover" />
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

export default Books;