import styled from "styled-components"
import ArrowLeftOutlinedIcon from '@mui/icons-material/ArrowLeftOutlined';
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined';
import { useState } from "react";
import {sliderItems} from "../data"
import { mobile } from '../responsive';
import { useSelector } from "react-redux";


const Container =styled.div`
    width:  100%;
    height: 60vh;
    display: flex;
    position: relative;
    overflow: hidden;
    margin-top: 0px;
    ${mobile({ display: "none" })}

`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    display: flex;
    background-color: #fff;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left:    ${props => props.direction === "left" && "10px"};
    right:  ${props => props.direction === "right" && "10px"};
    margin: auto;
    cursor: pointer;
    opacity: 0.5;
    z-index: 2;
`
const Wrapper = styled.div`
    height: 100px;
    display: flex;
    transition: all 1.5s ease;
    transform: translateX(${props => props.slideIndex * -50}vw);

`
const Slide = styled.div`
    height: 60vh;
    width: 50vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: ${props=>props.bg};
    

`
const ImgContainer = styled.div`
    height: 90%; 
    margin: 70px 0 0 70px;


`
const Image = styled.img`
    height: 90%;
    margin-top: 2px;
`
const LatestTitle = styled.p`
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin-left: 60px;
    color: #6e5102;
`
                 

const Slider = () => {

  const [slideIndex, setSliderIndex] = useState(0)

  const books = useSelector((state) => state.books);
  const latestBooks = books.slice(-4);

   const handleClick =(direction)=> {
    
    if (direction ==="left"){
      setSliderIndex(slideIndex>0 ? slideIndex-1 : 2)
    }else{
      setSliderIndex(slideIndex <2 ? slideIndex +1 : 0)
    }
   }
  return (
    <>
    <Container >

      <Arrow direction="left"  onClick={()=>handleClick("left")}>
        <ArrowLeftOutlinedIcon />
      </Arrow>
      <Wrapper slideIndex= {slideIndex}> 
      {latestBooks.map((item)=>(
        <Slide>
          <ImgContainer>
            <Image src={item.selectedFile}/>
          </ImgContainer>

          </Slide>
        ))}
       </Wrapper>
      <Arrow direction="right"  onClick={()=>handleClick("right")}>
        <ArrowRightOutlinedIcon />
      </Arrow>

    </Container>
    <LatestTitle>Latest Books</LatestTitle>
    </>
  )
}

export default Slider
