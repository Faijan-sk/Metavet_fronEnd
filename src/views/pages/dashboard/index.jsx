import React from 'react'

import HeroSection from '../../components/dashboard/HeroSection'
import Div2 from '../../components/dashboard/Div2'
import Div3 from '../../components/dashboard/Div3'
import Div4 from '../../components/dashboard/Div4'
import Footer from '../../components/dashboard/Footer'
import ClientReview3 from '../../components/card/ClientReview3'
import DoctorCarousel5 from '../../components/card/DoctorCarousel5'

// import Demobutton from "../../components/dashboard/Demobutton";

const index = () => {
  return (
    <div className="bg-white">
      <HeroSection />
      <Div2 />
      <Div3 />
      <Div4 />
      <DoctorCarousel5 />
      <ClientReview3 />
      <Footer />
    </div>
  )
}
export default index
