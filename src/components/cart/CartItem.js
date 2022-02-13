import React, {useState} from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({id, image, title, price, count, setCart, cart, deleteProduct}) => {
    const [cnt, setCnt] = useState(count)

    const increment = () =>{
        setCnt(currCount=>{
            const newCart = cart.map(product=>{
                if(product.id === id){
                    return {...product, count: currCount + 1}
                }
                return product
            })
            setCart(newCart)
            localStorage.setItem('cart', JSON.stringify(newCart))
            return currCount + 1
        })
    }
      
    const decrement = () =>{
        setCnt(currCount=>{
            if(count === 1){
            return currCount
            }
            const newCart = cart.map(product=>{
                if(product.id === id){
                    return {...product, count: currCount - 1}
                }
                return product
            })
            setCart(newCart)
            localStorage.setItem('cart', JSON.stringify(newCart))
            return currCount - 1
        })
    }


    return <div className='cart-item'>

                <div className='item-title'>
                    <img src={image} alt='product'></img>
                    <h6>{title}</h6>
                </div>
                <h5>${price}</h5>
                <div className='item-count'>
                    <button onClick={decrement}>-</button><h3>{cnt}</h3><button onClick={increment}>+</button>
                </div>
                <h5>${price*cnt}</h5>
                <button className='del'onClick={()=>deleteProduct(id)}><DeleteIcon className='delIcon' /></button>
            </div>
};

export default CartItem;
