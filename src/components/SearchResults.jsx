// SearchResults.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBooksBySearch } from '../actions/books';
import styled from 'styled-components';

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const searchResults = useSelector((state) => state.search.searchResults);
    const query = useQuery().get('searchQuery');

    useEffect(() => {
        if (query) {
            dispatch(getBooksBySearch({ searchTerm: query }));
        }
    }, [dispatch, query]);

    const handleBookClick = (id) => {
        navigate(`/book/${id}`);
      };
    

    return (
        <Container >
            <Title>Search Results for "{query}"</Title>
            {searchResults && searchResults.length ? (
                <CardGrid >
                    {searchResults.map((book) => (
                        <Card key={book._id}  onClick={() => handleBookClick(book._id || book.id)}>
                            <CardImage
                                src={book.selectedFile || 'https://via.placeholder.com/150'}
                                alt={book.title}
                            />
                            <CardBody>
                                <CardTitle>{book.title}</CardTitle>
                                <CardAuthor><strong>Author:</strong> {book.author}</CardAuthor>
                                <CardAvailable>{book.isAvailable ? "Available" : "Checked Out"}</CardAvailable> 
                            </CardBody>
                        </Card>
                    ))}
                </CardGrid>
            ) : (
                <NoResults>No results found.</NoResults>
            )}
        </Container>
    );
};

export default SearchResults;

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
  width: 100px;
  height: 150px;
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

const CardAvailable = styled.p`
  font-size: 0.9em;
  color: #02495C;
`;



const NoResults = styled.p`
  text-align: center;
  color: #777;
  font-size: 1.1em;
`;
