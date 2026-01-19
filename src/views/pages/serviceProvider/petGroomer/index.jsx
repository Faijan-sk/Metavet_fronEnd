import React, { useEffect } from 'react'
import KycWarning from '../KycWarning'
import DefaultPage from "./../DefaultPage"
import useJwt from "./../../../../enpoints/jwt/useJwt"

function index() {
  const kycUrl = "/groomerTo-client-kyc"

useEffect(()=>{

  const fetchKycStatus = async () =>{
    const response = useJwt.getKycStatusGroomerToClinet()
  }

  fetchKycStatus()
},[])


  return (
   <>
   <div>
   <KycWarning kycUrl={kycUrl}/>
  <DefaultPage /> 
  </div>
   
   </>
  )
}

export default index