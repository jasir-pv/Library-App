import styled, { keyframes } from 'styled-components';
import { Link } from 'react-router-dom';
import { mobile } from '../responsive';
import SwiperSlider from './SwiperSlider';
import { TextGenerateEffect } from "../components/ui/text-generate-effect";

// Animation keyframes
const fadeInScale = keyframes`
  0% { 
    opacity: 0;
    transform: scale(0.9);
  }
  100% { 
    opacity: 1;
    transform: scale(1);
  }
`;

const Container = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: flex-end;
  ${mobile({ 
    display: "flex", 
    justifyContent: 'center',
    height: '50vh'
  })}
`;

const Right = styled.div`
  justify-content: flex-end;
  width: 40%;
  height: 40vh;
  margin-top: 40px;
  ${mobile({ display: "none" })} 
`;

const Left = styled.div`
  justify-content: flex-start;
  margin-top: 100px;
  ${mobile({ marginTop: "30px" })}
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
  ${mobile({ textAlign: "center" })}
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 20px;
  line-height: 1.2;
  margin-top: 10px;
  opacity: 0;
  animation: ${fadeInScale} .6s ease-out forwards;
  animation-delay: 0.2s;
  
  ${mobile({ 
    fontSize: "2rem",
    marginBottom: '15px'
  })}
`;

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
`;

function Front() {
  const words = `"Libraries were full of ideas—perhaps the most dangerous and powerful of all weapons.”`;

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
  );
}

export default Front;