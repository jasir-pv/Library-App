import axios from "axios";


const API = axios.create({ baseURL: "http://localhost:5000" });

const getToken = () => localStorage.getItem("token");

API.interceptors.request.use((request) => {
  const token = getToken();
  if (token) {
    request.headers["token"] = `Bearer ${token}`;
  }
  console.log("Starting Request", request);
  return request;
}); 

 export const fetchBooks = () => API.get("/books");
 export const createBook = (newBook) => API.post('/books', newBook)
 export const deleteBook = (id) => API.delete(`/books/${id}`);
 export const updateBook = (id,updatedBook)=> API.patch(`/books/${id}`,updatedBook)


 export const fetchBooksBySearch = (searchQuery)=>
   API.get(`/books/search?searchQuery=${searchQuery.searchTerm || 'none' }`);

 export const fetchUsersBySearch = (searchQuery)=>
  API.get(`/users/search?searchQuery=${searchQuery.searchTerm || 'none' }`);

 export const signup = (formData) => API.post("/auth/register", formData);
 export const login = (formData) => API.post("/auth/login", formData);
 export const verifyToken = (token) => API.get("/auth/verifyToken", { headers: { token: `Bearer ${token}` } });


 export const fetchUsers = () => API.get("/users");
 export const deleteUser = (id) => API.delete(`/users/${id}`);
 export const editUser = (id,updatedUser)=> API.patch(`/users/${id}`,updatedUser)

 export const checkout = (id, userData) => API.patch(`books/${id}/checkout`, userData);
 export const checkin = (id, userData) => API.patch(`books//${id}/checkin`, userData);


 export const fetchCheckedOutBooks = () => API.get('/books/checkedout-books');
 

 