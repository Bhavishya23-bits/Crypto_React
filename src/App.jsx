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
        <Route path='/Crypto_React/' element={<Home />} />
        <Route path="/Crypto_React/blog/" element={<Blog />} />
        <Route path='/Crypto_React/:coinId/' element={<Coin />} />
        <Route path="/Crypto_React/wishlist/abcd/" element={<Wishlist />} />
      </Routes>
      <Footer></Footer>
    </div>
  )
}
export default App;