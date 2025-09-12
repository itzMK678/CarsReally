import React from 'react'
import ContactBox from '../components/ContactBox'
import Query from "../assets/Query.jpg"
import PartnersSlider from '../components/PatnersSection'
const Contact = () => {
  return (
    <div className='py-10 bg-gradient-to-r from-black to-blue-950'>
        <div
              className="relative w-full h-[300px] flex items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: `url(${Query})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50" />
      
              {/* Centered Content */}
              <div className="relative z-10 flex flex-col items-center text-center px-4">
                <p className="text-6xl font-bold text-white text-stroke">
                Contact us
                </p>
                <p className="mt-4 text-xl font-semibold text-white max-w-2xl">
               For Query and information you can contact us
                </p>
              </div>
            </div>
            <PartnersSlider/>
        <ContactBox/>
    </div>
  )
}

export default Contact