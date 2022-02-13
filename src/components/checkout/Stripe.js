import React from 'react'
import PaymentModal from './PaymentModal'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import './checkout.css'

const stripePromise = loadStripe('pk_test_51KQhNtKeL0hvJmNlaH11ZT2Ei3zzESu5H7q0W9ZCpHuOc1n6eFgbFXH3bzCmcG0H3HirJPj0C3ooTLjbMgG90Hgg00s4uJCpM8')

const Stripe = ({setCart, setShowModal, total}) => {
  return (
    <Elements stripe={stripePromise} >
        <PaymentModal setCart={setCart} setShowModal={setShowModal} total={total}/>
    </Elements>
  )
}

export default Stripe