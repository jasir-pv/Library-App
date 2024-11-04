import axios from "axios";

const url = 'http://localhost:5000/books'
const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((request) => {
  console.log("Starting Request", request);
  return request;
});

 export const fetchBooks = ()=> axios.get(url)
 export const createBook = (newBook) => axios.post(url, newBook)
 export const deleteBook = (id) => axios.delete(`${url}/${id}`);
 export const updateBook = (id,updatedBook)=> axios.patch(`${url}/${id}`,updatedBook)


//  export const signUp = (formData) => API.post("/user/signup", formData);
//  export const login = (formData) => API.post("/user/signin", formData);
//  export const fetchUsers = () => API.get("/user");
//  export const deleteUser = (id) => API.delete(`/user/${id}`);

 

const BASE_URL = 'http://localhost:5000/';
const TOKEN = localStorage.getItem("token");

export const publicRequest = axios.create({ baseURL: BASE_URL });
export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { header: `Bearer ${TOKEN}` },
});