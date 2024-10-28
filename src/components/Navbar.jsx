import React from 'react'
import styled from 'styled-components';


const Container = styled.div`
    width: 100%;
    height: 100px;
    background: rgb(255,255,255);
    background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(184,222,1,0.4290966386554622) 60%, rgba(210,255,79,1) 100%);
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

const Home = styled.li`
    margin: 20px;
`
const About = styled.li`
    margin: 20px;
`
const Search = styled.li`
    margin: 20px;
`
const Button = styled.button`
    margin: 20px;
    padding: 7px 15px;
    border: none;
    background-color: green;
    color: white;
    font-weight: 600;
    border-radius: 10px;

    &:hover{
        background-color: #03a83a;
    }
`


function Navbar() {
  return (
    <div className='container'>
    <Container>
        <Logo>Libe</Logo>
        <Navlinks>
            <Home>Home</Home>
            <About>About</About>
            <Search>Search</Search>
            <Button>Login</Button>
        </Navlinks>
    </Container>

     
    </div>
  )
}

export default Navbar
