// SearchResults.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getBooksBySearch } from '../actions/books';

const useQuery = () => new URLSearchParams(useLocation().search);

const SearchResults = () => {
    const dispatch = useDispatch();
    const searchResults = useSelector((state) => state.search.searchResults);
    console.log(searchResults, 'search results')
    const query = useQuery().get('searchQuery');

    useEffect(() => {
        if (query) {
            dispatch(getBooksBySearch({ searchTerm: query }));
        }
    }, [dispatch, query]);

    return (
        <div>
            <h2>Search Results for "{query}"</h2>
            {searchResults && searchResults.length ? (
                <ul>
                    {searchResults.map((book) => (
                        <li key={book._id}>
                            <h3>{book.title}</h3>
                            <p>{book.author}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default SearchResults;
