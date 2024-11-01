import * as api from '../api'


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