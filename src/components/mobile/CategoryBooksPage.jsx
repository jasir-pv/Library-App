import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../../actions/books.js';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { mobile } from '../../responsive.js';

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 10px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  color: #2c3e50;
  margin: 0;
  
  ${mobile({ fontSize: '20px' })}
`;

const BackButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #2980b9;
    transform: translateY(-2px);
  }
  
  ${mobile({ 
    padding: '6px 12px',
    fontSize: '12px'
  })}
`;

const CategoryHeader = styled.div`
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  padding: 15px;
  background: linear-gradient(135deg, #3498db, #2c3e50);
  border-radius: 10px;
  color: white;
`;

const CategoryTitle = styled.h2`
  font-size: 28px;
  margin: 0;
  text-transform: capitalize;
  
  ${mobile({ fontSize: '22px' })}
`;

const BooksCount = styled.p`
  font-size: 16px;
  margin: 5px 0 0 0;
  opacity: 0.9;
  
  ${mobile({ fontSize: '14px' })}
`;

const BooksContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  gap: 16px;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const BookCard = styled.div`
  width: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  background-color: white;
  border-radius: 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 12px;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

const BookImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const BookTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  margin: 0 0 5px 0;
  text-align: center;
  color: #2c3e50;
  
  ${mobile({ fontSize: '13px' })}
`;

const AuthorName = styled.p`
  font-family: sans-serif;
  font-size: 12px;
  margin: 0 0 5px 0;
  color: #555;
  text-align: center;
  
  ${mobile({ fontSize: '11px' })}
`;

const Availability = styled.p`
  font-family: sans-serif;
  font-size: 12px;
  font-weight: 500;
  margin: 0;
  color: ${(props) => (props.isAvailable ? "green" : "red")};
  
  ${mobile({ fontSize: '11px' })}
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #7f8c8d;
`;

const EmptyStateText = styled.p`
  font-size: 18px;
  margin: 0 0 20px 0;
`;

function CategoryBooksPage() {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category } = useParams();
  
  const [filteredBooks, setFilteredBooks] = useState([]);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  useEffect(() => {
    if (category && category !== 'All') {
      const filtered = books.filter((book) => 
        book.category && book.category.toLowerCase() === category.toLowerCase()
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  }, [books, category]);

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  const handleGoBack = () => {
    navigate(-1); // Go back to previous page
  };

  const categoryDisplayName = category === 'All' ? 'All Books' : category;

  return (
    <Container>
      <Header>
        <BackButton onClick={handleGoBack}>Back</BackButton>
        <PageTitle>Book Categories</PageTitle>
        <div style={{ width: '80px' }}></div> {/* Spacer for alignment */}
      </Header>

      <CategoryHeader>
        <CategoryTitle>{categoryDisplayName}</CategoryTitle>
        <BooksCount>{filteredBooks.length} books available</BooksCount>
      </CategoryHeader>

      {filteredBooks.length > 0 ? (
        <BooksContainer>
          {filteredBooks.map((book) => (
            <BookCard
              key={book._id || book.id}
              onClick={() => handleBookClick(book._id || book.id)}
            >
              <BookImage
                src={book.selectedFile}
                alt="Book cover"
              />
              <BookTitle>{book.title}</BookTitle>
              <AuthorName>{book.author}</AuthorName>
              <Availability isAvailable={book.isAvailable}>
                {book.isAvailable ? "Available" : "Checked Out"}
              </Availability>
            </BookCard>
          ))}
        </BooksContainer>
      ) : (
        <EmptyState>
          <EmptyStateText>No books found in this category.</EmptyStateText>
          <BackButton onClick={handleGoBack}>Browse All Books</BackButton>
        </EmptyState>
      )}
    </Container>
  );
}

export default CategoryBooksPage;