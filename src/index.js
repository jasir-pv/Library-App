import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import reducers from './reducers';
import {thunk} from 'redux-thunk';

const store = configureStore({
  reducer: reducers,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  // devTools: process.env.NODE_ENV !== "production",
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  
    <App />
  
    </Provider>

);

