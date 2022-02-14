import React, { useEffect, useState } from 'react';
import Product from './Product'
import {useNavigate} from 'react-router-dom'
import './products.css'
import Banner from '../Banner'
import { TailSpin } from  'react-loader-spinner'

const url = 'https://furn-buddy-backend.herokuapp.com/api/products/'

const Products = () => {
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState('')
    const [products, setProducts] = useState([])
    const navigate = useNavigate()

    const moreDetails = (id) =>{
        navigate(`/products/${id}`)
    }

    useEffect(()=>{
        const fetchProducts = async() =>{
            setLoading(true)
            fetch(`${url}${category}`)
            .then(res=>res.json())
            .then(obj=> {
                setProducts(obj.products)
                setLoading(false)
            }).catch(err=>{
                console.log(err)
                setLoading(false)
            })
        }
        fetchProducts()
    }, [category])

    // if(loading){
    //     return 
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
        {!loading ? 
            <div className='products'>
                {products.map((product)=>{
                    return <Product key={product.id} {...product} moreDetails={moreDetails}/>
                })}
            </div>
        :
        <TailSpin color="#d6951c" height={80} width={80} />
         }
        </div>
    </>
};

export default Products;
