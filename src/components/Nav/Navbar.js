import React from 'react';
import {Link} from 'react-router-dom'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './Nav.css'

const Navbar = () => {
  return <nav className='nav'>
        <h1>Furniture Buddy</h1>
      <ul>
          <li>
              <Link to='/'>Home</Link>
          </li>
          <li>
              <Link to='/Products'>Products</Link>
          </li>
      </ul>
      <h3><Link to='/cart'><ShoppingCartIcon/></Link></h3>
  </nav>;
};

export default Navbar;
