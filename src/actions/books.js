import * as api from '../api'
import axios from 'axios';

import { CHECKIN_BOOK, CHECKOUT_BOOK, BOOKS_ERROR, FETCH_CHECKEDOUT_BOOKS,FETCH_BY_SEARCH,FETCH_BOOKS } from './types.js';


export const getBooks = ()=> async (dispatch) =>{

    try {

        const {data} = await api.fetchBooks()
        dispatch ( {type: "FETCH_ALL", payload:data})
    } catch (error) {
        console.log(error.message, "get Book Error")
    }
}

// SEarch


export const getBooksBySearch = (searchQuery)=> async (dispatch) =>{

    try {
        const {data: {data}} = await api.fetchBooksBySearch(searchQuery)
        dispatch ( {type: FETCH_BY_SEARCH, payload:data})

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

export const checkout = (id, userId) => async (dispatch) => {
    try {
        const { data } = await api.checkout(id, { userId });
        dispatch({ type: CHECKOUT_BOOK, payload: data });
    } catch (error) {
        dispatch({ type: BOOKS_ERROR, payload: error.message });
    }
};

export const checkin = (id, userId) => async (dispatch) => {
    try {
        const { data } = await api.checkin(id, { userId });
        dispatch({ type: CHECKIN_BOOK, payload: data });
    } catch (error) {
        dispatch({ type: BOOKS_ERROR, payload: error.message });
    }
};



export const fetchCheckedOutBooks = () => async (dispatch) => {
    try {
      const { data } = await api.fetchCheckedOutBooks();
      dispatch({ type: FETCH_CHECKEDOUT_BOOKS, payload: data });
    } catch (error) {
      dispatch({ type: BOOKS_ERROR, payload: error.message });
    }
  };
