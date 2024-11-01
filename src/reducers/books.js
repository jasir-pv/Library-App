

export default (books=[], action) =>{
    switch (action.type) {
        case "FETCH_ALL":
            return action.payload;
        case "CREATE":
            return [...books, action.payload];
        case "UPDATE":
            return books.map((book)=> book._id === action.payload._id ? action.payload: book); 
        default:
            return books;
    }
}