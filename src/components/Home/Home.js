import React from 'react';
import {useNavigate} from 'react-router-dom'
import Footer from '../footer/Footer'
import './Home.css'

const Home = () => {
  const navigate = useNavigate()

  return <div className="home-page">
    <section className="welcome">
      <article className='home-intro'>
        <h1>Create Your Cozy Place</h1>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias, corrupti nobis! Ad maiores culpa repellendus rem quae repudiandae sed, nam recusandae, dolor vel neque sint hic voluptate excepturi aliquid deserunt minima? Consequuntur sapiente eligendi molestiae. Voluptates veniam doloribus ea corrupti?</p>
        <button className='btn' onClick={()=>navigate('/products')}>Browse Furniture</button>
      </article>
      <article className='home-img'>
       <img src={require('../../assets/banner2.jpg')} alt='home'/>
      </article>
    </section>
    <Footer/>
  </div>;
};

export default Home;
