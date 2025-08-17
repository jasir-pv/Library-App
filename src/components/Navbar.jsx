import React, { useState } from 'react'
import styled from 'styled-components';
// import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { getBooksBySearch } from '../actions/books';
import { mobile } from '../responsive';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutBtn from './ui/LogoutBtn';

const Container = styled.div`
    width: 100%;
    height: 100px;
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(0,0,0,0.429) 100%);
    display: flex;
    align-items: center;
    justify-content: space-around;
    ${mobile({ alignItems: "flex-start" })}
`
const Logo = styled.h1`
    color: brown;
    cursor: pointer;
`
const StyledMenuIcon = styled(MenuIcon)`
  width: 30px;
  color: lightblue;
  cursor: pointer;
`
const Navlinks = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    ${mobile({ 
        display: (props) => (props.open ? "flex" : "none"),
        flexDirection: "column",
        position: "absolute",
        top: "100px",
        right: "0",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        width: "100%",
        padding: "20px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 999,
    })}
`
const Users = styled.li`margin: 10px;`
const Home = styled.li`margin: 10px; cursor: pointer;`
const About = styled.li`margin: 10px;`
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 20px;
  background-color: #e0e0de;
  border: 1px solid #ccc;
  border-radius: 10px;
`;
const SearchInput = styled.input`
  padding: 10px;
  font-size: 14px;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: #e0e0de;
`;
const SearchButton = styled.div`cursor: pointer;`
const Button = styled.div`
    margin: 10px;
    padding: 7px 15px;
    background-color: #02495C;
    color: white;
    font-weight: 600;
    border-radius: 10px;
    cursor: pointer;
    &:hover { background-color: #04857a; }
`
const AddBook = styled.div`
    margin: 10px;
    padding: 7px 15px;
    background-color: #ad8d0a;
    color: white;
    font-weight: 600;
    border-radius: 10px;
    cursor: pointer;
    &:hover { background-color: #04857a; }
`
const LogoutButton = styled.div`
    margin: 10px;
    padding: 7px 15px;
    background-color: #024f49;
    color: white;
    font-weight: 600;
    border-radius: 10px;
    cursor: pointer;
    &:hover { background-color: #04857a; }
`
const User = styled.h4`
     text-transform: uppercase;
     color: brown;
`

function useQuery() {
  return new URLSearchParams(useLocation().search)
}

function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const query = useQuery()

  const searchQuery = query.get('searchQuery')
  const user = useSelector((state) => state.auth.user); 

  const [searchTerm, setSearchTerm] = useState("");

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(getBooksBySearch({ searchTerm }));
      navigate(`/books/search?searchQuery=${searchTerm}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <Container>
      <Link to='/'><Logo>Libe</Logo></Link>

      <Navlinks>
        {/* Always show Home & About */}
        <Link to='/'><Home>Home</Home></Link>
        <About>About</About>

        {/* Admin only links */}
        {user?.isAdmin && (
          <>
            <Link to='/userslist'><Users>Users</Users></Link>
            <Link to='/checkedout-books'><Users>Checked Out</Users></Link>
            <Link to='/addbook'><AddBook>Add Book</AddBook></Link>
          </>
        )}

        {/* Search Bar */}
        <SearchContainer>
          <SearchInput 
            type="text"
            value={searchTerm}
            onKeyDown={handleKeyPress}
            placeholder="Search by title or author" 
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchButton onClick={handleSearch}>
            <SearchOutlinedIcon />
          </SearchButton>
        </SearchContainer>

        {/* User Section */}
        {user ? (
          <>
            <User>{user.username}</User>
            {/* <LogoutButton onClick={handleLogout}>Logout</LogoutButton> */}
            <LogoutBtn > </LogoutBtn>
          </>
        ) : (
          <Link to='/login'><Button>Login</Button></Link>
        )}
      </Navlinks>
    </Container>
  )
}

export default Navbar
