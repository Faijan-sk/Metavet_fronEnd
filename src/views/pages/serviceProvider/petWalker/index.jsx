import React, { useEffect } from 'react'
import KycWarning from '../KycWarning'
import DefaultPage from "./../DefaultPage"
import useJwt from '../../../../enpoints/jwt/useJwt'

function index() {
  const kycUrl = '/walkerTo-client-Kyc'


  useEffect(()=>{

  const fetchKycStatus = async () =>{
    const response = useJwt.getStatusWalkerToClientKyc()
  }

  fetchKycStatus()
},[])

  return (
    <>
    <KycWarning kycUrl={kycUrl} />
    <DefaultPage />
    </>
  )
}

export default index