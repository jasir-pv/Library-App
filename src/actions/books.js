import * as api from '../api'

import { CHECKIN_BOOK, CHECKOUT_BOOK, BOOKS_ERROR } from './types';


export const getBooks = ()=> async (dispatch) =>{

    try {
        const {data} = await api.fetchBooks()
        dispatch ( {type: "FETCH_ALL", payload:data})
    } catch (error) {
        console.log(error.message, "get Book Error")
    }
}

export const createBook = (book) => async (dispatch)=>{
    try {
        const {data} = await api.createBook(book)
        dispatch({ type: 'CREATE', payload:data})
    } catch (error) {
        console.log(error)
    }
}

export const deleteBook = (id) => async (dispatch) =>{
    try {
        await api.deleteBook(id)
        dispatch({type:'DELETE', payload:id})
    } catch (error) {
        console.log(error,"Failed to delete book")
    }
}


export const updateBook= (id, book) => async (dispatch)=>{
    try{
        const {data} = await api.updateBook(id,book)
        dispatch ({type: 'UPDATE', payload:data})
    }catch(error){
        console.log(error)
    }
}


export const checkin = (id) => async (dispatch)=>{
    try{
        const {data} =await api.checkin(id)
        dispatch({type: 'CHECKIN_BOOK', payload:data})
        alert ('Book Checked in Succesfully!')
    } catch (error){
        dispatch ({ type: BOOKS_ERROR, payload: error.message})
        alert('Failed to Check in the Book')
    }
}

export const checkout = (id) => async (dispatch)=>{
    try{
        const {data} =await api.checkout(id)
        dispatch({type: 'CHECKOUT_BOOK', payload:data})
        alert ('Book Checked out Succesfully!')
    } catch (error){
        dispatch ({ type: BOOKS_ERROR, payload: error.message})
        alert('Failed to Check out the Book')
    }
}

