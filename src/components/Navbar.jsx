import React, { useState } from 'react'
import styled from 'styled-components';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { fetchBooks } from '../api';
import { getBooks,getBooksBySearch } from '../actions/books';
import { mobile } from '../responsive';
import MenuIcon from '@mui/icons-material/Menu';



const Container = styled.div`
    width: 100%;
    height: 100px;
    background: rgb(255,255,255);
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(0,0,0,0.4290966386554622) 100%);
    display: flex;
    align-items: center;
    justify-content: space-around;
    /* ${mobile({ overflow: "hidden" })} */
`
const Logo = styled.h1`
    color: brown;
`
const Menu = styled.div`
  text-align: left;
  ${mobile({ display: "block" })}
`

const Navlinks = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
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
    })}
`

const Users = styled.li`
    margin: 10px;
`

const Home = styled.li`
    margin: 10px;
    cursor: pointer;
`
const About = styled.li`
    margin: 10px;
`
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
  font-size: 10px;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: #e0e0de;
`;

const SearchButton =styled.div`
    cursor: pointer;
`


const Button = styled.div`
    margin: 10px;
    padding: 7px 15px;
    border: none;
    background-color: #02495C;
    color: white;
    font-weight: 600;
    border-radius: 10px;


    &:hover{
        background-color: #04857a;
    }
`
const AddBook = styled.div`
    margin: 10px;
    padding: 7px 15px;
    border: none;
    background-color: #ad8d0a;
    color: white;
    font-weight: 600;
    border-radius: 10px;


    &:hover{
        background-color: #04857a;
    }
`

const LogoutButton = styled.div`
    margin: 20px;
    padding: 7px 15px;
    border: none;
    background-color: #024f49;
    color: white;
    font-weight: 600;
    border-radius: 10px;


    &:hover{
        background-color: #04857a;
    }
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


    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')

    const user = useSelector((state) => state.auth.user); 
    const books = useSelector((state) => state.books);


    const [searchTerm, setSearchTerm] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);


    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
      };
  

     

  
    const handleSearch = () => {
      
      if(searchTerm.trim()){
          dispatch(getBooksBySearch({ searchTerm}))
          navigate(`/books/search`);
      }else{
        navigate('/')
      }
     
    };

    const handleKeyPress = (e) =>{
      if(e.keyCode === 13) {
          handleSearch()
      }
    }

  return (
    <div className='container'>
    <Container>
        <Link to='/'>
        <Logo>Libe</Logo>
        </Link>
        <Menu >
      <MenuIcon/>
      </Menu>
        
        <Navlinks>
        {user && user.isAdmin && (
            <>
           
            <Link to='/userslist'>
            <Users>Users</Users>
            </Link>
            <Link to='/checkedout-books'>
            <Users>Checked Out</Users>
            </Link>
            </>
        )}
        <Link to='/'>
            <Home>Home</Home>
            </Link>
            <About>About</About>
            <SearchContainer>
        <SearchInput 
          type="text" value={searchTerm}
          onKeyDown={handleKeyPress}
          placeholder="Search by title or author" 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <SearchButton onClick={handleSearch}>
        <SearchOutlinedIcon  />
        </SearchButton>
      </SearchContainer>

         </Navlinks>
         <Navlinks>

           { user ? (
            <>
             <Link to='/'>
            <User >{user.username}</User>
            </Link>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>,
            
            </>
            )  :(
             <Link to='/login'>
            <Button  >Login</Button>
            </Link>)}
            {user && user.isAdmin && (
            <Link to='/addbook'>
           <AddBook>Add Book</AddBook>
            </Link>
        )}
         
        </Navlinks>
    </Container>

     
    </div>
  )
}

export default Navbar
