import React from 'react'
import {Link} from 'react-router-dom'

const Banner = ({location}) => {
  

    if(location === 'Products' || location === 'Cart'){  
        return (
            <div className='banner'>
                <h2><Link to='/'>Home</Link></h2>
                <h2>/{location}</h2>
            </div>
        )
    }
    
    else{
        return  <div className='banner'>
        <h2><Link to='/'>Home/</Link></h2>
        <h2><Link to='/products'>Products</Link></h2>
        <h2>{location}</h2>
    </div>
    }
}
export default Banner