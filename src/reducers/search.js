
import { FETCH_BOOKS, CHECKIN_BOOK, CHECKOUT_BOOK,FETCH_CHECKEDOUT_BOOKS, BOOKS_ERROR, FETCH_BY_SEARCH, FETCH_BY_SEARCH_USER } from '../actions/types.js';


const initialState = {
    books: [],
    searchResults: [],
    checkedOutBooks: [],
    error: null,
    
  };
  
const searchReducer = (state = initialState, action) => {
    switch (action.type) {
  
      case FETCH_BY_SEARCH:
       
        return { ...state, searchResults: action.payload };


         
      case CHECKIN_BOOK:
      case CHECKOUT_BOOK:
        return {
          ...state,
          books: state.books.map((book) =>
            book._id === action.payload._id ? action.payload : book
          ),
        };
      case FETCH_CHECKEDOUT_BOOKS:
        return { ...state, checkedOutBooks: action.payload };
      case BOOKS_ERROR:
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };

  export default searchReducer;