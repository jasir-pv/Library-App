
// src/reducers/bookReducer.js


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


 










// const initialState = {
//     books: [],
//     error: null,
// };

//   export const booksReducer = (state = initialState, action) => {
//     switch (action.type) {

//         case CHECKIN_BOOK:
//         case CHECKOUT_BOOK:
//             return {
//                 ...state,
//                 books: state.books.map(book => book._id === action.payload._id ? action.payload : book),
//                 error: null,
//             };
//         case BOOKS_ERROR:
//             return { ...state, error: action.payload };
//         case FETCH_BY_SEARCH:
//           return { ...state, books: action.payload };
//         default:
//             return state;
//     }
// };
