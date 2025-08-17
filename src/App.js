import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/pages/Home';
import { useDispatch } from "react-redux";
import BookDetails from './components/pages/BookDetails';
import AddBook from './components/pages/AddBook';
import { useEffect } from 'react';
import UsersList from './components/pages/UsersList';
import { getBooks } from './actions/books';
import SearchResults from './components/SearchResults';
import SearchUser from './components/SearchUser';
import CheckedOutBooks from './components/CheckedOutBooks';
import AllBooks from './components/pages/AllBooks';



function App() {

 const dispatch = useDispatch();
 

useEffect(()=>{
    dispatch(getBooks())
},[dispatch])    
 
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />        
          <Route path="/login" element={<Login />} />  
          <Route path="/signup" element={<SignUp />} />
          <Route path="/book/:id" element={<BookDetails />} />
          <Route path="/addbook" element={<AddBook />} />
          <Route path="/userslist" element={<UsersList />} />
          <Route path="/books/search" element={<SearchResults />} />
          <Route path="/users/search" element={<SearchUser />} />
          <Route path="/checkedout-books" element={<CheckedOutBooks />} />
          <Route path="/books" element={<AllBooks />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
