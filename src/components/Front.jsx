
import React from 'react'
import styled from 'styled-components'
import Slider from './Slider'
import { Link } from 'react-router-dom'
import { mobile } from '../responsive'



    const Container = styled.div`
        width:  100%;
        height: 60vh;
        background-color: white;
        display: flex;
        justify-content: flex-end;
        ${mobile({ display: "flex", justifyContent: 'center' })}
    `
    const Right = styled.div`
        justify-content: flex-end;
        width: 50%;
        height: 40vh;
    `

    const Left = styled.div`
        justify-content: flex-start;
    `

    const InfoContainer = styled.div`
        flex: 1;
        padding: 50px;
        ${mobile({ textAlign: "center" })}
    `
    const Title = styled.h1`
        font-size: 50px;
        ${mobile({ fontSize: "25px" })}

    `
    const Desc = styled.p`
        margin: 30px 30px;
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 1px;
        ${mobile({ fontSize: "14px",fontWeight: '400' })}
    `
    const Button = styled.button`
        padding: 10px;
        background-color: transparent;
        cursor: pointer;
        font-size: 20px;
        ${mobile({ padding: "5px", fontSize:'12px' })}
    ` 

function Front() {
  return (
    <Container>
    <Left>
    <InfoContainer>
        <Title>
            Find Your Books
        </Title>
        <Desc>
        “Libraries were full of ideas—perhaps the most dangerous and powerful of all weapons.”
        </Desc>
        <Link to='/books'>
        <Button>All Books</Button>
        </Link>
    </InfoContainer>
    </Left>
      <Right>
        <Slider/>
      </Right>
    </Container>
  )
}

export default Front
