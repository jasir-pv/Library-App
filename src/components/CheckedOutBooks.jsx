import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCheckedOutBooks } from '../actions/books';

const CheckedOutBooks = () => {
  const dispatch = useDispatch();
  const checkedOutBooks = useSelector((state) => state.books.checkedOutBooks);
console.log(checkedOutBooks)
  useEffect(() => {
    dispatch(fetchCheckedOutBooks());
  }, [dispatch]);

  if (!checkedOutBooks) return <p>Loading...</p>;
 
  return (
    <div>
      <h2>Checked-Out Books</h2>
      <ul>
        {checkedOutBooks.map((book) => (
          <li key={book._id}>
            <h3>{book.title}</h3>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Checked Out By:</strong> {book.checkedOutBy.name} ({book.checkedOutBy.email})</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckedOutBooks;
