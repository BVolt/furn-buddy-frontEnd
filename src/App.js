import Home from './components/Home/Home'
import Products from './components/products/Products'
import Navbar from './components/Nav/Navbar'
import React, {useState} from 'react'
import {Route, Routes} from 'react-router-dom'
import ProductInfo from './components/products/ProductInfo'
import Cart from './components/cart/Cart'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

if (!localStorage.getItem('cart')){
  let array = [];
  localStorage.setItem('cart', JSON.stringify(array));
}

function App() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')))

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/products' element={<Products/>}></Route>
        <Route exact path='/cart' element={<Cart cart={cart} setCart={setCart}/>}></Route>
        <Route exact path='/products/:id' element={<ProductInfo  cart={cart} setCart={setCart}/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
