import React from 'react';
import { RouterProvider } from 'react-router';
import Router from './router';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <RouterProvider router={Router}/>
  )
}

export default App