import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import Books from '../Books'
import { useDispatch } from 'react-redux'
import {getBooks} from "../../actions/books"
import AddBook from './AddBook'
import Book from './BookDetails'

function Home() {

 
  const dispatch  = useDispatch()


  useEffect(()=>{
    dispatch(getBooks)
  },[dispatch])

  return (
    <div>
      <Navbar/>
      <Books />
      
    </div>
  )
}

export default Home
