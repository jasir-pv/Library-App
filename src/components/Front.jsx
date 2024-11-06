
import React from 'react'
import styled from 'styled-components'
import Slider from './Slider'



    const Container = styled.div`
        width:  100%;
        height: 60vh;
        background-color: white;
        display: flex;
        justify-content: flex-end;
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
    `
    const Title = styled.h1`
        font-size: 50px;

    `
    const Desc = styled.p`
        margin: 30px 30px;
        font-size: 18px;
        font-weight: 500;
        letter-spacing: 3px;
    `
    const Button = styled.button`
        padding: 10px;
        background-color: transparent;
        cursor: pointer;
        font-size: 20px;
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
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est consequuntur dolore sapiente earum, nesciunt enim iste fugiat esse quae nam laborum nihil ipsa? Porro at inventore id ducimus commodi autem.

        </Desc>
        <Button>All Books</Button>
    </InfoContainer>
    </Left>
      <Right>
        <Slider/>
      </Right>
    </Container>
  )
}

export default Front
