import  { useEffect } from 'react'
import Navbar from '../Navbar'
import Books from '../Books'
import { useDispatch } from 'react-redux'
import {getBooks} from "../../actions/books"
import Front from '../Front'
import LatestBooks from '../LatestBooks'


function Home() {

 
  const dispatch  = useDispatch()


  useEffect(()=>{
    dispatch(getBooks)
  },[dispatch])

  return (
    <div>
      <Navbar/>
      <Front/>
      <LatestBooks />
      <Books />
      
    </div>
  )
}

export default Home
