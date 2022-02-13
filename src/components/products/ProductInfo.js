import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom'
import './products.css'
import Banner from '../Banner'

const url = 'https://furn-buddy-backend.herokuapp.com/api/products/id/'

const ProductInfo = ({cart, setCart}) => {
  const [loading, setLoading] = useState(false)
  const {id} = useParams()
  const [product, setProduct] = useState('')
  const [count, setCount] = useState(1)

  const addToCart = () =>{
    const isInCart = cart.find(item=>item.id === Number(id))

    if(isInCart){
      const newCart = cart.map(item=>{
        if(item.id === Number(id)){
          return {...item, count: item.count + count }
        }
        else return item
      })
      setCart(newCart)
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
  
    else{
      setCart(currCart=>{
        localStorage.setItem('cart', JSON.stringify([...currCart, {
          id: product.id,
          image: product.image,
          title: product.name,
          price: product.price,
          count: count
        }]))
        return [...currCart, {
          id: product.id,
          image: product.image,
          title: product.name,
          price: product.price,
          count: count
        }]
      })
    }
  }

  const increment = () =>{
    setCount(currCount=>currCount + 1)
  }
  
  const decrement = () =>{
    setCount(currCount=>{
      if(count === 1){
        return currCount
      }
      return currCount - 1
    })
  }

  useEffect(()=>{
    try{
      setLoading(true)
      fetch(url+id).then(res=>res.json()).then(obj=>setProduct(obj.products[0]))
      setLoading(false)
    }catch(err){
      console.log(err)
      setLoading(false)
    }
  },[id])

  if(loading){
    return <h1>Loading...</h1>
  }
  return <>
    <Banner location={`/${product.name}`}/>
    <div className='product-info'>
            <div className='info-image'>
              <img src={product.image} alt='product'></img>
            </div>
            <div className='descriptors'>
              <h2>{product.name}</h2>
              <p>{product.desc}</p>
              <h5>${product.price}</h5>
              <div className='item-count'>
                <button onClick={decrement}>-</button> 
                <h3>{count}</h3>
                <button onClick={increment}>+</button>
              </div>
              <button className='btn' onClick={addToCart}>Add to Cart</button>
            </div>
    </div>
  </>
};

export default ProductInfo;
