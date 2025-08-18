
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { mobile } from '../responsive'
import SwiperSlider from './SwiperSlider'
import { TextGenerateEffect } from "../components/ui/text-generate-effect";



    const Container = styled.div`
        width:  100%;
        height: 70vh;
        background-color: white;
        display: flex;
        justify-content: flex-end;
        ${mobile({ display: "flex", justifyContent: 'center' })}
    `
    const Right = styled.div`
        justify-content: flex-end;
        width: 40%;
        height: 40vh;
        margin-top: 40px;
    `

    const Left = styled.div`
        justify-content: flex-start;
        margin-top: 50px;
    `

    const InfoContainer = styled.div`
        flex: 1;
        padding: 50px;
        ${mobile({ textAlign: "center" })}
    `
const Title = styled.h1`
    font-size: 3rem;
    font-weight: 700;
    color: #2c3e50;
    margin-bottom: 20px;
    line-height: 1.2;
    margin-top: 10px;
    
    ${mobile({ 
        fontSize: "2rem",
        marginBottom: '15px'
    })}
`
const Desc = styled.div`
    margin: 30px 0;
    font-size: 1.1rem;
    color: #7f8c8d;
    line-height: 1.6;
    
    ${mobile({ 
        fontSize: "1rem",
        margin: '20px 0'
    })}
`
    const Button = styled.button`
    padding: 12px 30px;
    background: linear-gradient(135deg, #3498db, #2c3e50);
    color: white;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(52, 152, 219, 0.3);
    align-self: flex-start;
    margin-top: 10px;
    
    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(52, 152, 219, 0.4);
    }
    
    ${mobile({ 
        padding: "10px 25px",
        alignSelf: 'center',
        fontSize: '0.9rem'
    })}
    ` 

function Front() {

    const words =`"Libraries were full of ideas—perhaps the most dangerous and powerful of all weapons.”
`;

  return (
    <Container>
    <Left>
    <InfoContainer>
        <Title>
            Find Your Books
        </Title>
       <TextGenerateEffect duration={2} filter={false} words={words} />
        <Link to='/books'>
        <Button>All Books</Button>
        </Link>
    </InfoContainer>
    </Left>
      <Right>
        <SwiperSlider/>
      </Right>

   
    </Container>
  )
}

export default Front
