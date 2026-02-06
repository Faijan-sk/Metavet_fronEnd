import React from 'react'
import PaymentCheckOutForm from "./CheckOut"
import { Elements } from '@stripe/react-stripe-js'

function index() {
  return (
    <Elements stripe={stripePromise}>
   <PaymentCheckOutForm clientSecret={clientSecret}/>
</Elements>
  )
}

export default index