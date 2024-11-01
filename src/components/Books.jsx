import React from 'react'
import { useSelector } from 'react-redux'



function Books({book}) {

  const books = useSelector((state)=> state.books)



  return (
    <div style={{display:'flex'}}>
     {books.map((book)=>(
        <div style={{ width:250, height:400}} key={book.id}>       
          <img src={book.img} 
            style={{
           maxWidth:250, height:250,
           }} 
            alt="Img" />
            <h5>{book.title}</h5>
          <p>{book.author}</p>
          <p>{book.category}</p>
            <p>{book.availablity}</p>
              <button style={{
                padding:7,
                border: "none",
                backgroundColor: "GrayText",
                color: 'white',
                fontWeight:'600',
                borderRadius: '5px',
                cursor:'pointer',
              }}>Check in</button>        
           </div>
     ))}
    </div>
  )
}

export default Books
