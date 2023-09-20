import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Wishlist from './pages/Wishlist';
import DeleteBook from './pages/DeleteBook';
import Home from './pages/Home';
export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/wishlist' element={<Wishlist />} />
      <Route path='/wishlist/delete/:id' element={<DeleteBook />} />
    </Routes>
  )
}
