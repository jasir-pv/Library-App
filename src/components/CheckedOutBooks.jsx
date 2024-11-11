import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCheckedOutBooks } from '../actions/books';
import styled from 'styled-components';
import Navbar from './Navbar';

const CheckedOutBooks = () => {
  const dispatch = useDispatch();
  const checkedOutBooks = useSelector((state) => state.search.checkedOutBooks);

  useEffect(() => {
    dispatch(fetchCheckedOutBooks());
  }, [dispatch]);

  if (!checkedOutBooks) return <p>Loading...</p>;

  return (
    <Container>
    <Navbar/>
      <Title>Checked-Out Books</Title>
      <CardGrid>
        {checkedOutBooks.map((book) => (
          <Card key={book._id}>
            <CardImage
              src={book.selectedFile}
              alt={book.title}
            />
            <CardBody>
              <CardTitle>{book.title}</CardTitle>
              <CardAuthor><strong>Author:</strong> {book.author}</CardAuthor>
              {book.checkedOutBy ? (
                <CardUser>
                  <strong>Checked Out By:</strong> {book.checkedOutBy.username} ({book.checkedOutBy.email})
                </CardUser>
              ) : (
                <CardUser><strong>Checked Out By:</strong> Unknown</CardUser>
              )}
            </CardBody>
          </Card>
        ))}
      </CardGrid>
    </Container>
  );
};

export default CheckedOutBooks;

// Styled Components
const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const Card = styled.div`
  width: 250px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 150px;
  height: 150x;
  object-fit: cover;
`;

const CardBody = styled.div`
  padding: 15px;
`;

const CardTitle = styled.h3`
  font-size: 1.2em;
  margin-bottom: 10px;
  color: #333;
`;

const CardAuthor = styled.p`
  font-size: 0.9em;
  color: #555;
`;

const CardUser = styled.p`
  font-size: 0.9em;
  color: #555;
  margin-top: 10px;
  font-style: italic;
`;
