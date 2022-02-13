import React from 'react';

const Product = ({id,image, name, desc, price, moreDetails}) => {

  return <div className='product' onClick={()=>moreDetails(id)}>
      <img src={image} alt='product image'></img>
      <div className='product-title'>
        <h4>{name}</h4>
        <h5>${price}</h5>
      </div>
  </div>;
};

export default Product;