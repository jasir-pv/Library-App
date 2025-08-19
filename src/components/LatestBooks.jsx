import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBooks } from '../actions/books.js';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { mobile } from '../responsive';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Styled components
const MobileContainer = styled.div`
  display: none;
  
  ${mobile`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    width: 100%;
  `}
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 10px;
  margin-bottom: 15px;
`;

const Title = styled.h2`
  font-size: 20px;
  color: #2c3e50;
  margin: 0;
`;

const MoreButton = styled.button`
  background: linear-gradient(135deg, #3498db, #2c3e50);
  color: white;
  border: none;
  border-radius: 18px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:active {
    transform: scale(0.98);
  }
`;

const VerticalSliderContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
`;

const BookSlide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: 350px;
  margin: 0 auto;
  max-width: 280px;
`;

const BookImage = styled.img`
  width: 80%;
  height: 250px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 5px;
`;

const BookTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  color: #2c3e50;
  line-height: 1.3;
`;

const AuthorName = styled.p`
  font-size: 14px;
  color: #555;
  text-align: center;
`;

// const BookDescription = styled.p`
//   font-size: 13px;
//   margin: 0 0 12px 0;
//   color: #666;
//   text-align: center;
//   display: -webkit-box;
//   -webkit-line-clamp: 3;
//   -webkit-box-orient: vertical;
//   overflow: hidden;
// `;

const Available = styled.p`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  text-align: center;
  color: ${(props) => (props.isAvailable ? "green" : "red")};
`;

const ViewDetailsButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.2s ease;
  
  &:active {
    background: #2980b9;
    transform: scale(0.98);
  }
`;

const CustomPagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  
  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    background: #ccc;
    opacity: 0.6;
    margin: 0 4px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .swiper-pagination-bullet-active {
    background: #3498db;
    opacity: 1;
    width: 20px;
    border-radius: 4px;
  }
`;

function LatestBooks() {
  const books = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [latestBooks, setLatestBooks] = useState([]);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  useEffect(() => {
    // Sort books by date (newest first) and take only the latest 5
    const sortedBooks = [...books].sort((a, b) => {
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });
    
    setLatestBooks(sortedBooks.slice(0, 5));
  }, [books]);

  const handleBookClick = (id) => {
    navigate(`/book/${id}`);
  };

  const handleMoreClick = () => {
    navigate('/all-books-mob');
  };

  return (
    <MobileContainer>
      {/* Header with title and more button */}
      <HeaderContainer>
        <Title>Latest Books</Title>
        <MoreButton onClick={handleMoreClick}>More</MoreButton>
      </HeaderContainer>

      <VerticalSliderContainer>
        <Swiper
          direction={'horizontal'}
          slidesPerView={1}
          spaceBetween={20}
          pagination={{
            clickable: true,
            el: '.custom-pagination',
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
          style={{ height: '100%' }}
        >
          {latestBooks.map((book) => (
            <SwiperSlide key={book._id || book.id}>
              <BookSlide>
                <BookImage src={book.selectedFile} alt="Book cover" />
                <BookTitle>{book.title}</BookTitle>
                <AuthorName>by {book.author}</AuthorName>
                {/* <BookDescription>
                  {book.description || "Discover this fascinating book that has captured readers' attention worldwide."}
                </BookDescription> */}
                <Available isAvailable={book.isAvailable}>
                  {book.isAvailable ? "Available for checkout" : "Currently checked out"}
                </Available>
              </BookSlide>
                <ViewDetailsButton onClick={() => handleBookClick(book._id || book.id)}>
                  View Details
                </ViewDetailsButton>
            </SwiperSlide>
          ))}
        </Swiper>
        
        <CustomPagination className="custom-pagination" />
      </VerticalSliderContainer>
    </MobileContainer>
  );
}

export default LatestBooks;