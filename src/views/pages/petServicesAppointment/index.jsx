import React, { useEffect, useState } from "react";
import { ShieldAlert, FileCheck, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";   
import AppotinmentListing from "./AppotinmentListing";
import useJwt from "../../../enpoints/jwt/useJwt";
import { Spinner } from "reactstrap";

const getUserInfo = () => {
  try {
    const userInfo = localStorage.getItem("userInfo");
    console.log(userInfo)
    return userInfo ? JSON.parse(userInfo) : null;

  } catch (error) {
    console.error('Error parsing userInfo:', error);
    return null;
  }
};



export default function CompleteYourKYC() {
  const navigate = useNavigate();
  const userInfo = getUserInfo();
  const [redirectTo ,setRedirectTo]  = useState('');
  
  // userInfo?.ServiceType;

  const fetchGroomerStatus =() => {

  }

  // useEffect(() => {
  //   console.table(userInfo.serviceType)
  //   switch (userInfo?.serviceType) {
  //     case "Pet_Groomer":
  //       fetchGroomerStatus()
  //       break;
  //     case "Pet_Walker":
  //       fetchWalkerStatus()
  //       break;
  //     case "Pet_Behaviourist":
  //       fetchBehaviouristStatus()
  //       break;
  //     default:
  //       setRedirectTo("/Signin");
  //   }
  // }, [userInfo]); 


   useEffect(() => {
    console.table(userInfo.serviceType)
    switch (userInfo?.serviceType) {
      case "Pet_Groomer":
        setRedirectTo("/groomer-kyc");

        break;

      case "Pet_Walker":
        setRedirectTo("/walker-kyc");
        break;

      case "Pet_Behaviourist":
        setRedirectTo("/behaviourist-kyc");
        break;

      default:
        setRedirectTo("/Signin");
    }
  }, [userInfo]); 


const [kycCheck , setKycCheck] = useState(false)

 const onClick = () => {

 setKycCheck(true)

  }
  
  useEffect(()=>{
    switch (userInfo?.ServiceType) {
      case "Pet_Groomer":
        

        setRedirectTo("/groomer-kyc");
        break;

      case "Pet_Walker":
        setRedirectTo("/walker-kyc");
        break;

      case "Pet_Behaviourist":
        setRedirectTo("/behaviourist-kyc");
        break;

      default:
        setRedirectTo("/Signin");
    }


  },[])

  return (<>
<Spinner size="xl" type="grow" />
  Hey</>)


  // return (<>
  //  {kycCheck? <AppotinmentListing /> : <div className="min-h-[70vh] flex items-center justify-center px-4 mt-5">
  //     <style>{`
  //       @keyframes fadeIn {
  //         from { opacity: 0; transform: translateY(20px); }
  //         to { opacity: 1; transform: translateY(0); }
  //       }
  //       @keyframes pulse-ring {
  //         0% { transform: scale(0.9); opacity: .75; }
  //         70% { transform: scale(1.2); opacity: 0; }
  //         100% { opacity: 0; }
  //       }
  //       .animate-fadeIn { animation: fadeIn .7s ease-out; }
  //       .animate-ring { animation: pulse-ring 2.3s infinite; }
  //     `}</style>

  //     <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 max-w-xl w-full text-center animate-fadeIn">
  //       {/* Icon Section */}
  //       <div className="relative mx-auto mb-6 w-28 h-28 flex items-center justify-center">
  //         {/* Ring */}
  //         <div className="absolute inset-0 rounded-full border-4 border-[#52B2AD] opacity-30 animate-ring"></div>

  //         {/* Icon Circle */}
  //         <div className="relative rounded-full bg-gradient-to-br from-[#52B2AD] to-[#42948f] w-full h-full flex items-center justify-center shadow-xl">
  //           <ShieldAlert size={56} className="text-white" strokeWidth={1.8}/>
  //         </div>

  //         {/* small badge */}
  //         <span className="absolute bottom-0 right-0 bg-yellow-400 rounded-full p-2 shadow-md border-2 border-white">
  //           <FileCheck size={20} className="text-white"/>
  //         </span>
  //       </div>

  //       {/* Title */}
  //       <h2 className="text-2xl font-bold text-gray-900 mb-2">
  //         Complete Your KYC
  //       </h2>

  //       {/* Subtitle */}
  //       <p className="text-gray-600 text-sm mb-6 max-w-sm mx-auto">
  //         To access all platform services including appointments, pet services and payments, 
  //         please verify your identity by completing the KYC process.
  //       </p>

  //       {/* Benefits */}
  //       <div className="bg-[#52B2AD]/10 text-[#264f4c] rounded-xl p-4 text-sm mb-6">
  //         <p className="font-semibold mb-2">Why KYC?</p>
  //         <ul className="space-y-1 text-left w-fit mx-auto">
  //           <li>• Secure your account from misuse</li>
  //           <li>• Enable bookings & payouts</li>
  //           <li>• Build trust with clients & doctors</li>
  //         </ul>
  //       </div>

  //       {/* CTA Button */}
  //       <button
  //   onClick={() => navigate(redirectTo)}   
  //         className="w-full bg-gradient-to-r from-[#52B2AD] to-[#42948f] 
  //                    hover:from-[#42948f] hover:to-[#52B2AD]
  //                    text-white font-semibold py-3 rounded-xl shadow-md 
  //                    hover:shadow-xl transition-all duration-300
  //                    flex items-center justify-center gap-2"
  //       >
  //         <span>Start KYC Verification</span>
  //         <ChevronRight size={18} className="group-hover:translate-x-1 transition"/>
  //       </button>

       
  //     </div>
  //   </div> }



  //  {/* <div className="w-full flex justify-center mt-4">
  // <button
  // onClick={onClick} className="w-fit border border-red-500 text-red-500 px-3 py-2 rounded-lg">
  //   make it verified
  // </button>
  //  </div> */}

    
  //   </>

   
  // );
}
