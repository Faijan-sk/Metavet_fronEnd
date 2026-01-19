import React, { useState } from 'react'
import { AlertCircle, X } from 'lucide-react'


function KycWarning({kycUrl}) {

    const [isVisible, setIsVisible] = useState(true)
    
      if (!isVisible) return null

  const handleRedirect = () => {
    if (!kycUrl) return
    window.location.href = kycUrl
  }



  return (
  <div className="sticky top-[64px] z-40 w-full bg-orange-50 border-l-4 border-orange-500 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0" />
            <div>
              <p className='text-orange-900 font-semibold'>Complete Your KYC</p>
              <p className='text-orange-800 text-sm'>Verify your identity to unlock all features and ensure account security.</p>
            </div>
          </div>
          
          <div className='flex items-center gap-3'>
            <button 
  onClick={handleRedirect}             
   className='bg-orange-600 hover:bg-orange-700 text-white font-medium px-6 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap'
            >
              Complete KYC
            </button>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default KycWarning