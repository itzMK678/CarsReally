import React from 'react'

const Quality = () => {
  return (
    <div><div className="flex flex-wrap justify-center gap-8 mb-12">
          {/* Card 1 */}
          <div className="group w-full sm:w-1/2 lg:w-1/4 transform transition-all duration-700 hover:bg-gradient-to-br from-purple-700 to-[#0051ff] hover:shadow-2xl rounded-xl p-8">
            <div className="bg-gradient-to-br from-[#00f9ff] to-purple-700 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:w-16 group-hover:h-16 transition-all duration-700">
              <svg className="w-16 h-16 text-white group-hover:w-8 group-hover:h-8 transition-all duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-gray-100 transition">
             Professional Events
            </h3>
            <p className="text-lg text-gray-300 group-hover:text-gray-200 transition">
              Expertly organized rally events with professional timing, safety measures,
      and support crews.
       </p>
          </div>

          {/* Card 2 */}
          <div className="group w-full sm:w-1/2 lg:w-1/4 transform transition-all duration-700 hover:bg-gradient-to-br from-purple-700 to-[#0051ff] hover:shadow-2xl rounded-xl p-8">
            <div className="bg-gradient-to-br from-[#00f9ff] to-purple-700 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:w-16 group-hover:h-16 transition-all duration-700">
              <svg className="w-16 h-16 text-white group-hover:w-8 group-hover:h-8 transition-all duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-gray-100 transition">
              Real-time Tracking
            </h3>
            <p className="text-lg text-gray-300 group-hover:text-gray-200 transition">
              Live timing and tracking systems to monitor progress and ensure
      participant safety throughout events.
       </p>
          </div>

          {/* Card 3 */}
          <div className="group w-full sm:w-1/2 lg:w-1/4 transform transition-all duration-700 hover:bg-gradient-to-br from-purple-700 to-[#0051ff] hover:shadow-2xl rounded-xl p-8">
            <div className="bg-gradient-to-br from-[#00f9ff] to-purple-700 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6 group-hover:w-16 group-hover:h-16 transition-all duration-700">
              <svg className="w-16 h-16 text-white group-hover:w-8 group-hover:h-8 transition-all duration-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-gray-100 transition">
              Community Driven
            </h3>
            <p className="text-lg text-gray-300 group-hover:text-gray-200 transition">
              Join a passionate community of rally enthusiasts and connect with fellow
      drivers and co-drivers.
        </p>
          </div>
        </div></div>
  )
}

export default Quality