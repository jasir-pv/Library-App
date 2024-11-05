
// src/reducers/bookReducer.js
import { FETCH_BOOKS, CHECKIN_BOOK, CHECKOUT_BOOK, BOOKS_ERROR } from '../actions/types.js';


export default (books=[], action) =>{
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload;
        case "CREATE":
            return [...books, action.payload];
        case "UPDATE":
            return books.map((book)=> book._id === action.payload._id ? action.payload: book); 
        case 'DELETE':
            return books.filter((book) => book._id !== action.payload)
        default:
            return books;
    }
}


const initialState = {
  books: [],
  error: null,
};

export const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS:
      return { ...state, books: action.payload };
    case CHECKIN_BOOK:
    case CHECKOUT_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book._id === action.payload._id ? action.payload : book
        ),
      };
    case BOOKS_ERROR:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};
