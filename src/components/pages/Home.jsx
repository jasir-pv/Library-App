import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Books from '../Books'
import Slider from '../Slider'
import { useDispatch } from 'react-redux'
import {getBooks} from "../../actions/books"
import Front from '../Front'


function Home() {

 
  const dispatch  = useDispatch()


  useEffect(()=>{
    dispatch(getBooks)
  },[dispatch])

  return (
    <div>
      <Navbar/>
      <Front/>
      <Books />
      
    </div>
  )
}

export default Home
