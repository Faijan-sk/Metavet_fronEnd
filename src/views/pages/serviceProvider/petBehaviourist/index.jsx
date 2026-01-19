import React, { useEffect, useState } from 'react'
import { AlertCircle, X } from 'lucide-react'
import KycWarning from '../KycWarning'
import DefaultPage from "./../DefaultPage"
import useJwt from '../../../../enpoints/jwt/useJwt'

function Index({location}) {
    const kycUrl = "/behaviouristTo-client-kyc"

    useEffect(()=>{

  const fetchKycStatus = async () =>{
    const response = useJwt.getKycStatusBehaviouristToClinet()
  }

  fetchKycStatus()
},[])


  return (
  <>
  <KycWarning kycUrl={kycUrl}/>
  <DefaultPage />
  </>
  )
}

export default Index