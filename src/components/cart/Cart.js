import React, {useEffect, useState} from 'react';
import CartItem from './CartItem'
import './cart.css'
import Banner from '../Banner'
import Stripe from '../checkout/Stripe';

const Cart = ({cart, setCart}) => {
  const [total, setTotal] = useState(0)
  const [showModal, setShowModal] = useState(false)

  const deleteProduct = (id) => {
    const newCart = cart.filter(product=> product.id !== id)
    setCart(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
  }

  useEffect(()=>{
    const calcTotal = () =>{
      let tots = 0
      cart.map(product => {
          return tots += product.price * product.count
        })
      setTotal(tots)
    }

    calcTotal()
  }, [cart])

  return <>
  <Banner location={'Cart'}/>
  <div className='cart'>
            <div className='cart-item' style={{borderBottom:'1px solid black'}}>
                <h3>Product</h3>
                <h3>Price</h3>
                <h3>Amount</h3>
                <h3>Subtotal</h3>
            </div>      
            {cart.map(product=>{
                return <CartItem key={product.id} {...product} setCart={setCart} cart={cart} deleteProduct={deleteProduct} />
            })
            }
            <div className='checkout'>
                <h3>Subtotal: ${total}</h3>
                <h3>Shipping Fee: $3.00</h3>
              <button className='btn'onClick={()=>setShowModal(true)}>Checkout</button>
            </div>
            {showModal ? <Stripe setCart={setCart} setShowModal={setShowModal} total={total+3}/> : null}
          </div>
          </>
};

export default Cart;
