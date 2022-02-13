import React, {useState, useRef} from 'react'
import {CardElement, useElements, useStripe} from '@stripe/react-stripe-js'
import axios from 'axios'
import Countries from './Countries'

const PaymentModal = ({setCart, setShowModal, total}) => {
	const [error, setError] = useState('')
    const stripe = useStripe()
    const elements = useElements()
	const emailRef = useRef('')
	const cityRef = useRef('')
	const countryRef = useRef('')
	const addyRef = useRef('')
	const zipRef = useRef('')
	const stateRef = useRef('')

    const handleSubmit = async(e) =>{
        e.preventDefault()
		const {error, paymentMethod} = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
			billing_details:{
				address: {
				city: cityRef.current.value,
				country: countryRef.current.value,
				line1: addyRef.current.value,
				postal_code: zipRef.current.value,
				state: stateRef.current.value
				},
				email: emailRef.current.value
			}
		})


		if(!error){
			try{
				const {id} = paymentMethod
				const res = await axios.post('https://furn-buddy-backend.herokuapp.com/payment', {
					amount: total * 100,
					id,
					receipt_email: emailRef.current.value,
				})
				setCart([])
				localStorage.setItem('clientList', JSON.stringify([]))
				setShowModal(false)
			}catch(err){
				console.log(err)
				setError("Could not make Payment")
			}
    	}
	}

  return (
	  <div className="stripe-modal">
		  <div className="modal-content">
			<form onSubmit={handleSubmit}>
				<h2 style={{margin: 0}}>Checkout as Guest</h2>
				<h3 style={{margin: 0}}>Total: ${total}</h3>
				<fieldset>
					<input className='stripe-input' type='email' placeholder='Email' ref={emailRef} required/>
				</fieldset>
				<fieldset>
					<CardElement required/>
				</fieldset>
				<fieldset>
					<input className='stripe-input' type='text' placeholder='Address' ref={addyRef} required/>
				</fieldset>
				<fieldset style={{display:'flex'}}>
					{/* <input className='stripe-input' type='text' placeholder='Country' ref={countryRef} required/> */}
					<select className='stripe-input'><Countries /></select>
					<input className='stripe-input' type='text' placeholder='City' ref={cityRef} required/>
				</fieldset>
				<fieldset style={{display:'flex'}}>
					<input className='stripe-input' type='text' placeholder='Zip' ref={zipRef}/>
					<input className='stripe-input' type='text' placeholder='State' ref={stateRef}/>
				</fieldset>
				<button className='btn' type='submit'>Submit</button>
				<button className='btn' onClick={()=>setShowModal(false)}>cancel</button>
			</form>
		</div>
	</div>
  )
}

export default PaymentModal