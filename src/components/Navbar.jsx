import React from 'react'
import styled from 'styled-components';
import AddCircleSharpIcon from '@mui/icons-material/AddCircleSharp';import { Link, useNavigate } from 'react-router-dom';
import { lightBlue } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';


const Container = styled.div`
    width: 100%;
    height: 100px;
    background: rgb(255,255,255);
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(1,222,167,0.4290966386554622) 60%, rgba(0,242,202,1) 100%);
    display: flex;
    align-items: center;
    justify-content: space-around;
`
const Logo = styled.h1`
    color: brown;
`

const Navlinks = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-decoration: none;
    list-style: none;
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
const Search = styled.li`
    margin: 10px;
`
const Button = styled.div`
    margin: 10px;
    padding: 7px 15px;
    border: none;
    background-color: brown;
    color: white;
    font-weight: 600;
    border-radius: 10px;


    &:hover{
        background-color: blue;
    }
`

const LogoutButton = styled.div`
    margin: 20px;
    padding: 7px 15px;
    border: none;
    background-color: brown;
    color: white;
    font-weight: 600;
    border-radius: 10px;


    &:hover{
        background-color: blue;
    }
`

  const User = styled.h4`
     text-transform: uppercase;
     color: brown;
  `


function Navbar() {
   
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const user =JSON.parse( localStorage.getItem("profile"));

    const user = useSelector((state) => state.auth.user); 

    console.log(user, "username is")
    

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
      };
  

  return (
    <div className='container'>
    <Container>
        <Link to='/'>
        <Logo>Libe</Logo>
        </Link>
        
        <Navlinks>
        {user && user.isAdmin && (
            <>
            <Link to='/addbook'>
            <AddCircleSharpIcon style={{color: '#0972ab',marginTop:5, height:100,}}/>
            </Link>
            <Users>Users</Users>
            </>
        )}
        <Link to='/'>
            <Home>Home</Home>
            </Link>
            <About>About</About>
            <Search>Search</Search>

         </Navlinks>
         <Navlinks>

           { user ? (
            <>
             <Link to='/'>
            <User >{user.username}</User>
            </Link>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </>
            )  :(
             <Link to='/login'>
            <Button  >Login</Button>
            </Link>)}

         
        </Navlinks>
    </Container>

     
    </div>
  )
}

export default Navbar
