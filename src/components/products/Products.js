import React, { useEffect, useState } from 'react';
import Product from './Product'
import {useNavigate} from 'react-router-dom'
import './products.css'
import Banner from '../Banner'

const url = 'https://furn-buddy-backend.herokuapp.com/api/products/'

const Products = () => {
    const [category, setCategory] = useState('')
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    const moreDetails = (id) =>{
        navigate(`/products/${id}`)
    }

    useEffect(()=>{
        fetch(`${url}${category}`).then(res=>res.json()).then(obj=> setProducts(obj.products))
    }, [category])

    // if(loading){
    //     return <h1>Loading...</h1>
    // }
    return<> 
        <Banner location={'Products'}/>
        <div style={{borderBottom:'1px solid black', marginTop: '20px'}}></div>
        <div className='product-page'>
        <div className='categories'>
            <h3>Categories</h3>
            <ul>
                <li onClick={()=>setCategory('')}>All</li>
                <li onClick={()=>setCategory('category/seat')}>Seating</li>
                <li onClick={()=>setCategory('category/stand')}>Tables and Stands</li>
                <li onClick={()=>setCategory('category/wall')}>Wall Accessories</li>
                <li onClick={()=>setCategory('category/floor')}>Floor Accesories</li>
            </ul>
        </div>
        <div className='products'>
        {products.map((product)=>{
            return <Product key={product.id} {...product} moreDetails={moreDetails}/>
        })}
        </div>
        </div>
    </>
};

export default Products;
