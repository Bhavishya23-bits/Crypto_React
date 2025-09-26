import React from 'react';
import Navbar from './components/Navbar/Navbar';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Coin from './pages/Coin/Coin';
import Blog from './pages/Blog/blog';
import Wishlist from "./pages/Wishlist/Wishlist";
import Footer from './components/Footer/Footer';
function App(){
  return(
    <div className='App'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path='/coin/:coinId' element={<Coin />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
      <Footer></Footer>
    </div>
  )
}
export default App;