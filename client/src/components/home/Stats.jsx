const StatsSection = () => {
  return (
    <div className="w-full mx-auto px-4 py-12">
      <h2 className="text-5xl font-bold text-center mt-15 text-white mb-6">Event Statistics</h2>

         <div className="flex flex-wrap pt-[20px] justify-evenly mb-16">
        <div className="group text-center cursor-pointer">
          <div className="text-4xl font-bold text-white mb-2 group-hover:text-[#00F9FF]">150+</div>
          <div className="text-gray-600 group-hover:text-[#00F9FF]">Events Hosted</div>
        </div>
        
       
        <div className="group text-center cursor-pointer">
          <div className="text-4xl font-bold text-white mb-2 group-hover:text-[#00F9FF]">2.5K+</div>
          <div className="text-gray-600 group-hover:text-[#00F9FF]">Participants</div>
        </div>
        
       
        <div className="group text-center cursor-pointer">
          <div className="text-4xl font-bold text-white mb-2 group-hover:text-[#00F9FF]">25</div>
          <div className="text-gray-600 group-hover:text-[#00F9FF]">States Covered</div>
        </div>
        
       
        <div className="group text-center cursor-pointer">
          <div className="text-4xl font-bold text-white mb-2 group-hover:text-[#00F9FF]">98%</div>
          <div className="text-gray-600 group-hover:text-[#00F9FF]">Satisfaction Rate</div>
        </div>
      </div>
      
     
     
    </div>
  );
};

export default StatsSection;