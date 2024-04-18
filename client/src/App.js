import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home/Home';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import {Toaster} from 'react-hot-toast'
import ProtecteRoute from './Components/ProtecteRoute';
import { useSelector } from 'react-redux';

const App = () => {
  const { loading } = useSelector((state) => state.alerts);
  console.log(loading);
  return (
    <BrowserRouter>
          {loading && (
        <div className='spinner-parent'>
          <div class="spinner-border" role="status">
          </div>
        </div>
      )}
    <Toaster position="bottom-right" reverseOrder={false} />
    <Routes>
      <Route path='/' element={<ProtecteRoute><Home /></ProtecteRoute>} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App